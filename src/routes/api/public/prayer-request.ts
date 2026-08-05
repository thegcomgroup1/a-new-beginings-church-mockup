import * as React from 'react'
import { render } from 'react-email'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'a-new-beginning-church'
const SENDER_DOMAIN = 'notify.anewbeginningchurch.org'
const FROM_DOMAIN = 'anewbeginningchurch.org'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

type AnySupabase = SupabaseClient<any, any, any>

async function ensureUnsubscribeToken(
  supabase: AnySupabase,
  email: string,
): Promise<string> {
  const normalized = email.toLowerCase()
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalized)
    .maybeSingle()
  if (existing && !existing.used_at) return existing.token as string
  const token = generateToken()
  await supabase
    .from('email_unsubscribe_tokens')
    .upsert(
      { token, email: normalized },
      { onConflict: 'email', ignoreDuplicates: true },
    )
  const { data: stored } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token')
    .eq('email', normalized)
    .maybeSingle()
  return (stored?.token as string) || token
}

async function enqueueTemplate(opts: {
  supabase: AnySupabase
  templateName: string
  recipient: string
  templateData: Record<string, any>
  idempotencyKey: string
}) {
  const { supabase, templateName, recipient, templateData, idempotencyKey } = opts
  const template = TEMPLATES[templateName]
  if (!template) throw new Error(`Template '${templateName}' not registered`)

  const effectiveRecipient = template.to || recipient
  const messageId = idempotencyKey

  // Suppression check
  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', effectiveRecipient.toLowerCase())
    .maybeSingle()
  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: 'suppressed',
    })
    return { suppressed: true }
  }

  const unsubscribeToken = await ensureUnsubscribeToken(supabase, effectiveRecipient)

  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: effectiveRecipient,
    status: 'pending',
  })

  const { error: enqueueError } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (enqueueError) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    throw new Error('Failed to enqueue email')
  }
  return { queued: true }
}

const RequestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255).optional().or(z.literal('')).default(''),
  phone: z.string().trim().max(40).optional().default(''),
  request: z.string().trim().min(1).max(2000),
  isPrivate: z.boolean().optional().default(false),
})

export const Route = createFileRoute('/api/public/prayer-request')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json(
            { ok: false, error: 'Server configuration error' },
            { status: 500 },
          )
        }

        let parsed
        try {
          const raw = await request.json()
          parsed = RequestSchema.safeParse(raw)
        } catch {
          return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
        }
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: 'Please include your name and your request.' },
            { status: 400 },
          )
        }
        const { name, email, phone, request: prayerRequest, isPrivate } = parsed.data

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const submissionId = crypto.randomUUID()

        try {
          await enqueueTemplate({
            supabase,
            templateName: 'prayer-request-notify',
            recipient: 'anewbeginningrushville@gmail.com',
            templateData: { name, email, phone, request: prayerRequest, isPrivate },
            idempotencyKey: `prayer-request-notify-${submissionId}`,
          })
          if (email) {
            await enqueueTemplate({
              supabase,
              templateName: 'prayer-request-confirm',
              recipient: email,
              templateData: { name },
              idempotencyKey: `prayer-request-confirm-${submissionId}`,
            })
          }
        } catch (err) {
          console.error('prayer-request enqueue failed', err)
          return Response.json(
            { ok: false, error: 'Could not send right now. Please try again.' },
            { status: 500 },
          )
        }

        return Response.json({ ok: true, submissionId })
      },
    },
  },
})
