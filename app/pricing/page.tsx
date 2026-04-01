'use client'

import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl">✨</span>
            <h1 className="text-lg font-bold text-gray-900">人像换背景</h1>
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-violet-600 underline">
            返回首页
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">选择适合你的套餐</h2>
          <p className="text-gray-500">专业 AI 抠图，让你的照片更出彩</p>
        </div>

        {/* 定价卡片 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* 免费版 */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">免费版</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">¥0</div>
              <p className="text-sm text-gray-500">永久免费</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">每月 5 次免费额度</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">保存最近 50 条历史</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">24 种预设背景</span>
              </li>
            </ul>
            <Link href="/" className="block w-full py-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              免费使用
            </Link>
          </div>

          {/* 基础版 */}
          <div className="bg-white rounded-2xl border-2 border-violet-300 p-6 shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs px-3 py-1 rounded-full">
              推荐
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">基础版</h3>
              <div className="text-4xl font-bold text-violet-600 mb-1">¥9.9</div>
              <p className="text-sm text-gray-500">每月</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">每月 50 次处理</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">历史记录永久保存</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">优先处理速度</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">无广告体验</span>
              </li>
            </ul>
            <button className="block w-full py-3 text-center bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium">
              立即订阅
            </button>
          </div>

          {/* 专业版 */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">专业版</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">¥99</div>
              <p className="text-sm text-gray-500">每年 <span className="text-violet-600">省 20%</span></p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600"><strong>无限次</strong>使用</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">历史记录永久保存</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">批量处理（即将推出）</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">优先客服支持</span>
              </li>
            </ul>
            <button className="block w-full py-3 text-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              立即订阅
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">常见问题</h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ 未登录用户可以使用吗？</h4>
              <p className="text-gray-600 text-sm">可以试用 1 次，体验产品功能。登录后可获得每月 5 次免费额度。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ 免费额度什么时候重置？</h4>
              <p className="text-gray-600 text-sm">每月 1 号自动重置，未使用的额度不会累积到下月。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ 付费后可以退款吗？</h4>
              <p className="text-gray-600 text-sm">订阅后 7 天内未使用可全额退款，使用后不支持退款。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ 图片会被保存吗？</h4>
              <p className="text-gray-600 text-sm">不会。所有图片仅在浏览器本地处理，服务器不保存任何图片数据。</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ 支持哪些支付方式？</h4>
              <p className="text-gray-600 text-sm">支持微信支付、支付宝、信用卡等主流支付方式。</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
