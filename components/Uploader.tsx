'use client'

import { useRef, useState, useCallback } from 'react'

interface UploaderProps {
  onUpload: (file: File) => void
  disabled?: boolean
}

export default function Uploader({ onUpload, disabled }: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = (file: File): string | null => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return '仅支持 JPG、PNG、WEBP 格式'
    if (file.size > 10 * 1024 * 1024) return '图片大小不能超过 10MB'
    return null
  }

  const handleFile = useCallback((file: File) => {
    const err = validate(file)
    if (err) { setError(err); return }
    setError(null)
    onUpload(file)
  }, [onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  return (
    <div className="w-full">
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center w-full min-h-[220px]
          rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-violet-500 hover:bg-violet-50'}
          ${dragging ? 'border-violet-500 bg-violet-50' : 'border-gray-300 bg-white'}
        `}
      >
        <div className="flex flex-col items-center gap-3 p-8 text-center">
          <div className="text-5xl">🖼️</div>
          <div className="text-gray-700 font-semibold text-lg">拖拽图片到此处</div>
          <div className="text-gray-400 text-sm">或点击选择文件</div>
          <div className="text-gray-400 text-xs mt-1">支持 JPG / PNG / WEBP，最大 10MB</div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
          disabled={disabled}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
    </div>
  )
}
