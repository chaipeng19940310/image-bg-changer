'use client'

import { useEffect, useRef, useCallback } from 'react'
import type { BgType, PresetBg } from './BgPicker'
import { SOLID_COLORS } from './BgPicker'

interface PreviewProps {
  originalUrl: string
  transparentUrl: string
  bgType: BgType
  bgColor: string
  selectedPreset: PresetBg | null
  customBgUrl: string | null
}

export default function Preview({ originalUrl, transparentUrl, bgType, bgColor, selectedPreset, customBgUrl }: PreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const compose = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fgImg = new Image()
    fgImg.crossOrigin = 'anonymous'
    fgImg.onload = () => {
      canvas.width = fgImg.naturalWidth
      canvas.height = fgImg.naturalHeight

      const drawFg = () => {
        ctx.drawImage(fgImg, 0, 0)
      }

      // 纯色背景
      if (bgType === 'color') {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawFg()
        return
      }

      // 预设（纯色分类）
      if (bgType === 'preset' && selectedPreset?.id.startsWith('s')) {
        ctx.fillStyle = SOLID_COLORS[selectedPreset.id] || '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawFg()
        return
      }

      // 图片背景
      const bgImgUrl = bgType === 'preset' ? selectedPreset?.full : customBgUrl
      if (!bgImgUrl) {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawFg()
        return
      }

      const bgImg = new Image()
      bgImg.crossOrigin = 'anonymous'
      bgImg.onload = () => {
        // 居中裁剪填满画布
        const scale = Math.max(canvas.width / bgImg.naturalWidth, canvas.height / bgImg.naturalHeight)
        const sw = canvas.width / scale
        const sh = canvas.height / scale
        const sx = (bgImg.naturalWidth - sw) / 2
        const sy = (bgImg.naturalHeight - sh) / 2
        ctx.drawImage(bgImg, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
        drawFg()
      }
      bgImg.onerror = () => {
        ctx.fillStyle = '#F3F4F6'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawFg()
      }
      bgImg.src = bgImgUrl
    }
    fgImg.src = transparentUrl
  }, [transparentUrl, bgType, bgColor, selectedPreset, customBgUrl])

  useEffect(() => { compose() }, [compose])

  const download = (format: 'jpg' | 'png') => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    if (format === 'jpg') {
      link.download = 'portrait-bg-changed.jpg'
      link.href = canvas.toDataURL('image/jpeg', 0.95)
    } else {
      // 透明 PNG 直接用原始抠图结果
      link.download = 'portrait-transparent.png'
      link.href = transparentUrl
    }
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* 双图对比 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">Original</span>
          <div className="rounded-2xl overflow-hidden border border-gray-200 w-full aspect-[3/4] bg-gray-100 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={originalUrl} alt="Original" className="object-contain w-full h-full" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-500 font-medium">With New Background</span>
          <div className="rounded-2xl overflow-hidden border border-gray-200 w-full aspect-[3/4] bg-gray-100 flex items-center justify-center">
            <canvas ref={canvasRef} className="object-contain w-full h-full" />
          </div>
        </div>
      </div>

      {/* 下载按钮 */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={() => download('jpg')}
          className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white rounded-xl font-medium transition-colors shadow-sm"
        >
          ⬇ Download JPG
        </button>
        <button
          onClick={() => download('png')}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-medium border border-gray-300 transition-colors shadow-sm"
        >
          ⬇ Download Transparent PNG
        </button>
      </div>
    </div>
  )
}
