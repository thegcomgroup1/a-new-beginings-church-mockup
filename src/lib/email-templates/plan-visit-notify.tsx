import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  when?: string
  note?: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  color: '#1f1d1a',
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 600, margin: '0 0 8px' }
const lead = { fontSize: '15px', color: '#5b5347', margin: '0 0 20px' }
const row = {
  borderTop: '1px solid #ece7dc',
  padding: '12px 0',
}
const label = {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#7a6f5c',
  margin: '0 0 4px',
}
const value = { fontSize: '15px', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-wrap' as const }

const PlanVisitNotify = ({ name, email, when, note }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New visitor planning to attend — {name || 'a guest'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New "Plan Your Visit" submission</Heading>
        <Text style={lead}>
          Someone just filled out the Plan Your Visit form on the website.
        </Text>

        <Section style={row}>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>When they're thinking of coming</Text>
          <Text style={value}>{when || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Notes</Text>
          <Text style={value}>{note || '—'}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PlanVisitNotify,
  subject: (data: Record<string, any>) =>
    `New visitor planning to attend — ${data?.name || 'website form'}`,
  displayName: 'Plan a Visit — Church Notification',
  to: 'anewbeginningrushville@gmail.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    when: 'This Sunday',
    note: 'Bringing my two kids — first time at church in a while.',
  },
} satisfies TemplateEntry