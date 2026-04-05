export const runtime = 'edge'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // 强制先测试能否获取 Token
    const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
    const SECRET = process.env.PAYPAL_SECRET
    if (!CLIENT_ID || !SECRET) {
      return NextResponse.json({ error: 'Missing Credentials' }, { status: 500 })
    }

    const auth = btoa(`${CLIENT_ID}:${SECRET}`)
    const res = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await res.json()
    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Token Fetch Failed', details: tokenData }, { status: 500 })
    }

    return NextResponse.json({ success: true, token: 'Got it!' })
  } catch (error: any) {
    return NextResponse.json({ error: 'System Error', detail: error.toString() }, { status: 500 })
  }
}
