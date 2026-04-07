export const runtime = 'edge'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { event_type, resource } = body

    // 基础鉴权：建议后续在 Webhook Headers 中校验 PayPal Signature
    // 此处简化为接收并处理关键事件
    
    const db = (process.env as any).DB

    if (event_type === 'BILLING.SUBSCRIPTION.ACTIVATED' || event_type === 'BILLING.SUBSCRIPTION.CREATED') {
      await db.prepare(
        `INSERT INTO subscriptions (id, user_email, plan_id, status, activated_at) 
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(id) DO UPDATE SET status=excluded.status`
      ).bind(resource.id, resource.subscriber.email_address, resource.plan_id, 'ACTIVE').run()
    } else if (event_type === 'BILLING.SUBSCRIPTION.CANCELLED' || event_type === 'BILLING.SUBSCRIPTION.SUSPENDED') {
      await db.prepare(
        `UPDATE subscriptions SET status = ? WHERE id = ?`
      ).bind('CANCELLED', resource.id).run()
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 })
  }
}
