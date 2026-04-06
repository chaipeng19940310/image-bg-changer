export const runtime = 'edge'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // 强制硬编码测试
    const CLIENT_ID = "AWI8R_2YUZMgPNQrIyV5oFLrJ9ThskBapLSdO_JnHdWNq3n-lCgJ6lV1G336G-n-_RL5HsV5I_lYusBA"
    const SECRET = "ECrwdXe_ec36ziOu68HvOoct14C9h-Av-mJfPnW46DVDX5P0wFjrFHqRV1dQDAxMtN4r6zJmXc-vobS6"
    
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
