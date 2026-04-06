export const runtime = 'edge'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // 从环境变量读取
    const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
    const SECRET = process.env.PAYPAL_CLIENT_SECRET
    
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
    return NextResponse.json({ 
      debug_version: "2026-04-06_1703",
      success: true, 
      token_exists: !!tokenData.access_token, 
      debug: tokenData 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      debug_version: "2026-04-06_1703_ERROR",
      error: 'System Error', 
      detail: error.toString() 
    }, { status: 500 })
  }
}
