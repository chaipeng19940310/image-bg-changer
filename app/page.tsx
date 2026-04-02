'use client'

import { useState, useCallback, useRef } from 'react'
import Uploader from '@/components/Uploader'
import BgPicker, { type BgType, type PresetBg } from '@/components/BgPicker'
import Preview from '@/components/Preview'
import AuthButton from '@/components/AuthButton'

type Status = 'idle' | 'loading' | 'done' | 'error'

export default function Home() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [transparentUrl, setTransparentUrl] = useState<string | null>(null)

  const [bgType, setBgType] = useState<BgType>('preset')
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [selectedPreset, setSelectedPreset] = useState<PresetBg | null>(null)
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(null)

  const prevOriginalUrl = useRef<string | null>(null)
  const prevTransparentUrl = useRef<string | null>(null)
  const prevCustomBgUrl = useRef<string | null>(null)

  const handleUpload = useCallback(async (file: File) => {
    // 检查额度
    const user = localStorage.getItem('user')
    const subscription = localStorage.getItem('subscription')
    const isSubscribed = subscription ? JSON.parse(subscription).status === 'active' : false
    const history = JSON.parse(localStorage.getItem('processHistory') || '[]')
    const now = new Date()
    const thisMonth = history.filter((item: any) => {
      const date = new Date(item.timestamp)
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    })
    
    if (!user && history.length >= 1) {
      setError('Trial limit reached. Please sign in to continue.')
      setStatus('error')
      return
    }
    
    if (user && !isSubscribed && thisMonth.length >= 3) {
      setError('Monthly free quota used up. Please upgrade your plan.')
      setStatus('error')
      return
    }

    if (prevOriginalUrl.current) URL.revokeObjectURL(prevOriginalUrl.current)
    if (prevTransparentUrl.current) URL.revokeObjectURL(prevTransparentUrl.current)

    const localUrl = URL.createObjectURL(file)
    prevOriginalUrl.current = localUrl
    setOriginalUrl(localUrl)
    setTransparentUrl(null)
    setError(null)
    setStatus('loading')

    try {
      const form = new FormData()
      form.append('image_file', file)
      const res = await fetch('/api/remove-bg', { method: 'POST', body: form })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: '处理失败，请重试' })) as { error?: string }
        throw new Error(data.error || '处理失败，请重试')
      }

      const blob = await res.blob()
      const tUrl = URL.createObjectURL(blob)
      prevTransparentUrl.current = tUrl
      setTransparentUrl(tUrl)
      setStatus('done')

      // 保存到历史记录
      const history = JSON.parse(localStorage.getItem('processHistory') || '[]')
      history.unshift({
        id: Date.now().toString(),
        timestamp: Date.now(),
        originalUrl: localUrl,
        resultUrl: tUrl,
      })
      localStorage.setItem('processHistory', JSON.stringify(history.slice(0, 50)))
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理失败，请重试')
      setStatus('error')
    }
  }, [])

  const handleReset = useCallback(() => {
    if (prevOriginalUrl.current) URL.revokeObjectURL(prevOriginalUrl.current)
    if (prevTransparentUrl.current) URL.revokeObjectURL(prevTransparentUrl.current)
    if (prevCustomBgUrl.current) URL.revokeObjectURL(prevCustomBgUrl.current)
    prevOriginalUrl.current = null
    prevTransparentUrl.current = null
    prevCustomBgUrl.current = null
    setOriginalUrl(null)
    setTransparentUrl(null)
    setCustomBgUrl(null)
    setSelectedPreset(null)
    setError(null)
    setStatus('idle')
  }, [])

  const handleCustomUpload = (url: string) => {
    if (prevCustomBgUrl.current) URL.revokeObjectURL(prevCustomBgUrl.current)
    prevCustomBgUrl.current = url
    setCustomBgUrl(url)
    setBgType('custom')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AI Background Remover</h1>
              <p className="text-xs text-gray-400">AI Auto Remove · Multiple Backgrounds · Free to Use</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/pricing" className="text-sm text-gray-600 hover:text-violet-600 transition-colors">
              💎 Pricing
            </a>
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 flex flex-col gap-6">

        {/* 上传区 */}
        {(status === 'idle' || status === 'error') && (
          <div className="flex flex-col gap-3">
            <Uploader onUpload={handleUpload} />
            {status === 'error' && error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={handleReset} className="text-xs text-red-500 underline">Upload Again</button>
                    {error.includes('quota') && (
                      <a href="/pricing" className="text-xs text-violet-600 underline font-medium">Upgrade Plan</a>
                    )}
                    {error.includes('sign in') && (
                      <button onClick={() => window.location.reload()} className="text-xs text-violet-600 underline font-medium">Sign In Now</button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {status === 'loading' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center justify-center py-20 gap-5">
            <div className="w-14 h-14 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-gray-700 font-medium">AI is removing background...</p>
              <p className="text-gray-400 text-sm mt-1">Usually takes 3-5 seconds</p>
            </div>
          </div>
        )}

        {/* 结果区 */}
        {status === 'done' && originalUrl && transparentUrl && (
          <div className="flex flex-col gap-5">
            {/* 背景选择 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-4">Choose Background</p>
              <BgPicker
                bgType={bgType}
                bgColor={bgColor}
                selectedPreset={selectedPreset}
                customBgUrl={customBgUrl}
                onTypeChange={setBgType}
                onColorChange={setBgColor}
                onPresetSelect={setSelectedPreset}
                onCustomUpload={handleCustomUpload}
              />
            </div>

            {/* 预览 + 下载 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <Preview
                originalUrl={originalUrl}
                transparentUrl={transparentUrl}
                bgType={bgType}
                bgColor={bgColor}
                selectedPreset={selectedPreset}
                customBgUrl={customBgUrl}
              />
            </div>

            <div className="text-center">
              <button onClick={handleReset} className="text-sm text-gray-400 hover:text-violet-500 transition-colors underline underline-offset-2">
                ↩ Upload Another Image
              </button>
            </div>
          </div>
        )}

        {/* 首页说明 */}
        {status === 'idle' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '📤', title: 'Upload Photo', desc: 'Support JPG / PNG / WEBP, max 10MB' },
                { icon: '✂️', title: 'AI Auto Remove', desc: 'Smart detection, precise background removal' },
                { icon: '🖼️', title: 'Choose & Download', desc: 'Preset gallery / Solid color / Custom background' },
              ].map(s => (
                <div key={s.title} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5">
              <h2 className="text-sm font-semibold text-violet-800 mb-3">🎨 Background Gallery Preview</h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {[
                  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=100&q=50',
                  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=50',
                  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&q=50',
                  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&q=50',
                  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=100&q=50',
                  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=100&q=50',
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=50',
                  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=100&q=50',
                ].map((url, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={url} alt="" className="aspect-square rounded-xl object-cover w-full opacity-80 hover:opacity-100 transition-opacity" loading="lazy" />
                ))}
              </div>
              <p className="text-xs text-violet-500 mt-2">24 preset backgrounds available after upload</p>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-gray-100 bg-white py-5">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-400 space-y-1">
          <p>Powered by <a href="https://www.remove.bg" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Remove.bg</a> · Images from <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Unsplash</a></p>
          <p>Images are processed locally and not stored on servers</p>
        </div>
      </footer>
    </div>
  )
}
