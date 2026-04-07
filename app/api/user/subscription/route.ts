export const runtime = 'edge'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_email = searchParams.get('user_email')
    
    if (!user_email) {
      return NextResponse.json({ error: 'Missing user_email' }, { status: 400 })
    }

    const db = (process.env as any).DB
    const result = await db.prepare(
      `SELECT * FROM subscriptions WHERE user_email = ?`
    ).bind(user_email).first()
    
    return NextResponse.json({ subscription: result || null })
  } catch (error: any) {
    return NextResponse.json({ error: error.toString() }, { status: 500 })
  }
}

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
