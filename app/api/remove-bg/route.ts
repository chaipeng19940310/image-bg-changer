export const runtime = 'edge'

import { getRequestContext } from '@cloudflare/next-on-pages'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image_file') as File | null

    if (!imageFile) {
      return Response.json({ error: '请上传图片文件' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(imageFile.type)) {
      return Response.json({ error: '仅支持 JPG、PNG、WEBP 格式的图片' }, { status: 400 })
    }

    if (imageFile.size > 10 * 1024 * 1024) {
      return Response.json({ error: '图片大小不能超过 10MB' }, { status: 400 })
    }

    // Cloudflare Edge runtime 通过 getRequestContext().env 读取环境变量
    const ctx = getRequestContext()
    const apiKey = (ctx.env as Record<string, string>).REMOVE_BG_API_KEY || process.env.REMOVE_BG_API_KEY
    if (!apiKey) {
      return Response.json({ error: '服务配置错误，请联系管理员' }, { status: 500 })
    }

    const removeBgForm = new FormData()
    removeBgForm.append('image_file', imageFile)
    removeBgForm.append('size', 'auto')
    removeBgForm.append('type', 'person')

    const res = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': apiKey },
      body: removeBgForm,
    })

    if (!res.ok) {
      if (res.status === 402) return Response.json({ error: '服务繁忙（额度不足），请稍后重试' }, { status: 503 })
      if (res.status === 403) return Response.json({ error: '服务配置错误，请联系管理员' }, { status: 500 })
      return Response.json({ error: '抠图处理失败，请重试' }, { status: 500 })
    }

    const pngBuffer = await res.arrayBuffer()
    return new Response(pngBuffer, {
      status: 200,
      headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    console.error('remove-bg error:', err)
    return Response.json({ error: '服务器错误，请稍后重试' }, { status: 500 })
  }
}
