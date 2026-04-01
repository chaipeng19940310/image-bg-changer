'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  name: string
  email: string
  picture: string
}

interface HistoryItem {
  id: string
  timestamp: number
  originalUrl: string
  resultUrl: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [stats, setStats] = useState({ total: 0, thisMonth: 0 })
  const [quota, setQuota] = useState({ used: 0, limit: 5, plan: 'free' })

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      router.push('/')
      return
    }
    setUser(JSON.parse(savedUser))

    // 加载历史记录
    const savedHistory = localStorage.getItem('processHistory')
    if (savedHistory) {
      const items: HistoryItem[] = JSON.parse(savedHistory)
      setHistory(items)
      
      // 计算统计
      const now = new Date()
      const thisMonth = items.filter(item => {
        const date = new Date(item.timestamp)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      })
      setStats({ total: items.length, thisMonth: thisMonth.length })
      
      // 计算本月使用次数
      setQuota({ used: thisMonth.length, limit: 5, plan: 'free' })
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const clearHistory = () => {
    if (confirm('确定要清空所有历史记录吗？')) {
      localStorage.removeItem('processHistory')
      setHistory([])
      setStats({ total: 0, thisMonth: 0 })
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl">✨</span>
            <h1 className="text-lg font-bold text-gray-900">人像换背景</h1>
          </Link>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-gray-600 underline">
            退出登录
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm text-center">
            <div className="text-3xl font-bold text-violet-600">{stats.total}</div>
            <div className="text-sm text-gray-500 mt-1">总处理次数</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm text-center">
            <div className="text-3xl font-bold text-violet-600">{stats.thisMonth}</div>
            <div className="text-sm text-gray-500 mt-1">本月处理次数</div>
          </div>
        </div>

        {/* 额度卡片 */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 shadow-lg mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">当前套餐：免费版</p>
              <p className="text-2xl font-bold">本月剩余 {quota.limit - quota.used} 次</p>
              <p className="text-xs opacity-75 mt-1">已使用 {quota.used}/{quota.limit} 次</p>
            </div>
            <Link href="/pricing" className="bg-white text-violet-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              升级套餐
            </Link>
          </div>
        </div>

        {/* 历史记录 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">处理历史</h3>
            {history.length > 0 && (
              <button onClick={clearHistory} className="text-sm text-red-500 hover:text-red-600 underline">
                清空历史
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-400">还没有处理记录</p>
              <Link href="/" className="inline-block mt-4 text-sm text-violet-600 hover:text-violet-700 underline">
                去处理图片
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {history.slice(0, 12).map(item => (
                <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 hover:border-violet-300 transition-colors">
                  <img src={item.resultUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={item.resultUrl} download className="text-white text-sm underline">
                      下载
                    </a>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-xs text-white">
                      {new Date(item.timestamp).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
