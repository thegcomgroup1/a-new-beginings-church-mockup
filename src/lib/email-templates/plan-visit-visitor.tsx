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
  Hr,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  when?: string
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  color: '#1f1d1a',
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '26px', fontWeight: 600, lineHeight: 1.25, margin: '0 0 16px' }
const p = { fontSize: '16px', lineHeight: 1.6, margin: '0 0 14px' }
const box = {
  border: '1px solid #e8e3d8',
  borderRadius: '10px',
  padding: '18px 20px',
  backgroundColor: '#faf7f1',
  margin: '18px 0',
}
const label = {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#7a6f5c',
  margin: '0 0 4px',
}
const value = { fontSize: '15px', fontWeight: 600, margin: '0 0 12px' }
const signoff = { fontSize: '15px', lineHeight: 1.6, margin: '20px 0 0' }
const hr = { borderColor: '#e8e3d8', margin: '24px 0' }

const PlanVisitVisitor = ({ name, when }: Props) => {
  const first = (name || '').trim().split(/\s+/)[0]
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>We're so glad you're planning to visit A New Beginning Church.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {first ? `Hi ${first},` : 'Hi there,'}
          </Heading>
          <Text style={p}>
            Thank you for letting us know you're planning to visit A New Beginning Church.
            We can't wait to meet you — there will be a seat saved for you.
          </Text>

          <Section style={box}>
            <Text style={label}>Sunday Worship</Text>
            <Text style={value}>10:30 AM</Text>
            <Text style={label}>Where</Text>
            <Text style={value}>1024 S Old 3, Rushville, IN 46173</Text>
            {when ? (
              <>
                <Text style={label}>You said you're thinking</Text>
                <Text style={{ ...value, marginBottom: 0 }}>{when}</Text>
              </>
            ) : null}
          </Section>

          <Text style={p}>
            Here's what to expect: no dress code, no pressure, no awkward sign-ins.
            Walk in, and someone will say hello. Come exactly as you are — that's
            the whole point of "a new beginning."
          </Text>
          <Text style={p}>
            If you have any questions before Sunday, just reply to this email.
            We'd love to answer them.
          </Text>

          <Hr style={hr} />
          <Text style={signoff}>
            Looking forward to worshiping with you,
            <br />
            <strong>Pastor Mark Mathews</strong>
            <br />
            A New Beginning Church · Rushville, IN
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: PlanVisitVisitor,
  subject: "We're so glad you're planning to visit — A New Beginning Church",
  displayName: 'Plan a Visit — Visitor Confirmation',
  previewData: { name: 'Jane Doe', when: 'This Sunday' },
} satisfies TemplateEntry