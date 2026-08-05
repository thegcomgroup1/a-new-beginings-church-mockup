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
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  color: '#1f1d1a',
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '24px', fontWeight: 600, margin: '0 0 12px' }
const p = { fontSize: '15px', lineHeight: 1.6, color: '#3c372f', margin: '0 0 16px' }
const quote = {
  fontSize: '15px',
  lineHeight: 1.6,
  fontStyle: 'italic' as const,
  color: '#5b5347',
  borderLeft: '3px solid #c9b892',
  padding: '4px 0 4px 14px',
  margin: '0 0 20px',
}
const sig = { fontSize: '14px', color: '#7a6f5c', margin: '24px 0 0' }

const PrayerRequestConfirm = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We're praying for you.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>We're praying for you.</Heading>
        <Text style={p}>
          {name ? `${name}, thank you` : 'Thank you'} for trusting us with your
          request. It's been sent straight to our pastors and prayer team, and
          we'll be lifting it up by name.
        </Text>
        <Section>
          <Text style={quote}>
            "Cast all your anxiety on him because he cares for you." — 1 Peter 5:7
          </Text>
        </Section>
        <Text style={p}>
          If you'd like someone to reach out personally, just reply to this
          email or call us at (765) 389-8013. And if you're able, we'd love to
          see you Sunday at 10:30 AM — 1024 S Old 3, Rushville, IN.
        </Text>
        <Text style={sig}>
          — Pastor Mark &amp; Tammy Mathews
          <br />
          A New Beginning Church
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PrayerRequestConfirm,
  subject: "We're praying for you — A New Beginning Church",
  displayName: 'Prayer Request — Visitor Confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry
