'use client'

import { useState, useCallback, useRef } from 'react'
import Uploader from '@/components/Uploader'
import BgPicker, { type BgType, type PresetBg } from '@/components/BgPicker'
import Preview from '@/components/Preview'

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
        const data = await res.json().catch(() => ({ error: '处理失败，请重试' }))
        throw new Error(data.error || '处理失败，请重试')
      }

      const blob = await res.blob()
      const tUrl = URL.createObjectURL(blob)
      prevTransparentUrl.current = tUrl
      setTransparentUrl(tUrl)
      setStatus('done')
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
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <div>
            <h1 className="text-lg font-bold text-gray-900">人像换背景</h1>
            <p className="text-xs text-gray-400">AI 自动抠图 · 海量背景 · 免费使用</p>
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
                <div>
                  <p className="text-red-700 font-medium text-sm">{error}</p>
                  <button onClick={handleReset} className="mt-1 text-xs text-red-500 underline">重新上传</button>
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
              <p className="text-gray-700 font-medium">AI 正在智能抠图...</p>
              <p className="text-gray-400 text-sm mt-1">通常需要 3-5 秒，请稍候</p>
            </div>
          </div>
        )}

        {/* 结果区 */}
        {status === 'done' && originalUrl && transparentUrl && (
          <div className="flex flex-col gap-5">
            {/* 背景选择 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-700 mb-4">选择背景</p>
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
                ↩ 重新上传一张
              </button>
            </div>
          </div>
        )}

        {/* 首页说明 */}
        {status === 'idle' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: '📤', title: '上传照片', desc: '支持 JPG / PNG / WEBP，最大 10MB' },
                { icon: '✂️', title: 'AI 自动抠图', desc: '智能识别人像，精准去除背景' },
                { icon: '🖼️', title: '选背景下载', desc: '预设图库 / 纯色 / 自定义背景随意换' },
              ].map(s => (
                <div key={s.title} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5">
              <h2 className="text-sm font-semibold text-violet-800 mb-3">🎨 背景图库预览</h2>
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
              <p className="text-xs text-violet-500 mt-2">共 24 张预设背景，上传照片后可自由选择</p>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-gray-100 bg-white py-5">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-400 space-y-1">
          <p>抠图技术由 <a href="https://www.remove.bg" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Remove.bg</a> 提供 · 背景图片来自 <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Unsplash</a></p>
          <p>图片不会被上传或保存，处理完毕立即释放</p>
        </div>
      </footer>
    </div>
  )
}
