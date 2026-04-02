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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const subscriptionId = searchParams.get('subscription_id')
    
    if (!subscriptionId) {
      return NextResponse.redirect(new URL('/pricing?error=missing_id', req.url))
    }

    const token = await getAccessToken()
    const res = await fetch(`${PAYPAL_API}/v1/billing/subscriptions/${subscriptionId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    const subscription = await res.json()
    
    if (subscription.status === 'ACTIVE') {
      const redirectUrl = new URL('/pricing', req.url)
      redirectUrl.searchParams.set('success', '1')
      redirectUrl.searchParams.set('subscription_id', subscriptionId)
      redirectUrl.searchParams.set('plan_id', subscription.plan_id)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.redirect(new URL('/pricing?error=payment_failed', req.url))
  } catch (error) {
    return NextResponse.redirect(new URL('/pricing?error=unknown', req.url))
  }
}
