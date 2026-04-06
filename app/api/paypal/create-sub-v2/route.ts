export const runtime = 'edge'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { planId, userEmail } = await req.json()
    const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
    const SECRET = process.env.PAYPAL_CLIENT_SECRET
    
    if (!CLIENT_ID || !SECRET) {
        return NextResponse.json({ error: 'Missing Credentials' }, { status: 500 })
    }
    
    // 1. 获取 Token
    const auth = btoa(`${CLIENT_ID}:${SECRET}`)
    const tokenRes = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=client_credentials',
    })
    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    // 2. 使用 Token 创建订阅
    const subRes = await fetch('https://api-m.paypal.com/v1/billing/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan_id: planId,
        subscriber: { email_address: userEmail },
        application_context: { return_url: 'https://image-bg-changer.shop/pricing?success=1', cancel_url: 'https://image-bg-changer.shop/pricing?cancelled=1' }
      })
    })

    const subData = await subRes.json()
    const approvalUrl = subData.links?.find((l: any) => l.rel === 'approve')?.href

    return NextResponse.json({ success: true, approvalUrl, subData })
  } catch (error: any) {
    return NextResponse.json({ error: 'System Error', detail: error.toString() }, { status: 500 })
  }
}
