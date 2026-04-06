export const runtime = 'edge'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { id, user_email, plan_id, status } = await req.json()
    // 通过 context 读取绑定的 D1 数据库
    const db = (process.env as any).DB
    
    await db.prepare(
      `INSERT INTO subscriptions (id, user_email, plan_id, status, activated_at) 
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_email) DO UPDATE SET status=excluded.status, plan_id=excluded.plan_id`
    ).bind(id, user_email, plan_id, status).run()
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 })
  }
}
