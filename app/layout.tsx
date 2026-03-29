import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '人像换背景 - 免费在线AI抠图换背景工具',
  description: '免费在线人像抠图换背景工具，支持自然、城市、渐变等预设背景图库，也可自定义上传背景。AI自动抠图，即时预览，一键下载。',
  keywords: '人像换背景, 抠图换背景, 在线换背景, 头像换背景, AI抠图, remove background',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
