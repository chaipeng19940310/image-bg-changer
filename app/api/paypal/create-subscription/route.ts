export const runtime = 'edge'

import { NextResponse } from 'next/server'

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'AYzsvMlf0e-udOsVzG22Ld8dn4KG7EifrQvZpQuSYXJq2A82pD1KnQkEdH5BU6tJ75rB3T6FmjCXLbj6'
const SECRET = process.env.PAYPAL_SECRET || 'EAL_p0C8alSDTeBdjtrnVFts0LKwfwZPrflRqfvQxz4QpSWMFGjSNlp0ufqPrl2iSBMMCoyvXTMCEKAj'

async function getAccessToken() {
  const auth = btoa(`${CLIENT_ID}:${SECRET}`)
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  return data.access_token
}

export async function POST(req: Request) {
  try {
    const { planId, userEmail } = await req.json()
    const token = await getAccessToken()

    const origin = req.headers.get('origin') || 'http://localhost:3000'

    const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: planId,
        subscriber: userEmail ? { email_address: userEmail } : undefined,
        application_context: {
          brand_name: 'AI Background Remover',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          return_url: `${origin}/api/paypal/capture`,
          cancel_url: `${origin}/pricing?cancelled=1`,
        }
      }),
    })

    const subscription = await res.json()
    const approvalUrl = subscription.links?.find((l: any) => l.rel === 'approve')?.href

    return NextResponse.json({
      subscriptionId: subscription.id,
      approvalUrl,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
