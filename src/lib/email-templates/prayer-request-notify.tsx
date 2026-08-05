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
  phone?: string
  request?: string
  isPrivate?: boolean
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
const row = { borderTop: '1px solid #ece7dc', padding: '12px 0' }
const label = {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#7a6f5c',
  margin: '0 0 4px',
}
const value = {
  fontSize: '15px',
  lineHeight: 1.5,
  margin: 0,
  whiteSpace: 'pre-wrap' as const,
}

const PrayerRequestNotify = ({ name, email, phone, request, isPrivate }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New prayer request — {name || 'a guest'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New prayer request</Heading>
        <Text style={lead}>
          Someone just submitted a prayer request through the website.
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
          <Text style={label}>Phone</Text>
          <Text style={value}>{phone || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Request</Text>
          <Text style={value}>{request || '—'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Privacy</Text>
          <Text style={value}>
            {isPrivate
              ? 'Marked PRIVATE — for pastors and the prayer team only.'
              : 'OK to share with the prayer team.'}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PrayerRequestNotify,
  subject: (data: Record<string, any>) =>
    `New prayer request — ${data?.name || 'website form'}`,
  displayName: 'Prayer Request — Church Notification',
  to: 'anewbeginningrushville@gmail.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '(765) 555-0134',
    request: 'Please pray for my mother — she has surgery on Thursday.',
    isPrivate: true,
  },
} satisfies TemplateEntry
