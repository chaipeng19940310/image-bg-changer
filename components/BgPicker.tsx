'use client'

import { useRef, useState } from 'react'

export type BgType = 'color' | 'preset' | 'custom'

export interface PresetBg {
  id: string
  label: string
  thumb: string
  full: string
}

export const PRESET_CATEGORIES = ['自然', '城市', '渐变', '纯色'] as const
export type PresetCategory = typeof PRESET_CATEGORIES[number]

export const PRESETS: Record<PresetCategory, PresetBg[]> = {
  '自然': [
    { id: 'n1', label: '绿林', thumb: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&q=60', full: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80' },
    { id: 'n2', label: '海边', thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=60', full: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80' },
    { id: 'n3', label: '蓝天', thumb: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=200&q=60', full: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1200&q=80' },
    { id: 'n4', label: '花园', thumb: 'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=200&q=60', full: 'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=1200&q=80' },
    { id: 'n5', label: '山景', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=60', full: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
    { id: 'n6', label: '草地', thumb: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=200&q=60', full: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=80' },
  ],
  '城市': [
    { id: 'c1', label: '办公室', thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=60', full: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
    { id: 'c2', label: '咖啡馆', thumb: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&q=60', full: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80' },
    { id: 'c3', label: '城市夜景', thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&q=60', full: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80' },
    { id: 'c4', label: '图书馆', thumb: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=60', full: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80' },
    { id: 'c5', label: '街景', thumb: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&q=60', full: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80' },
    { id: 'c6', label: '现代建筑', thumb: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=60', full: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80' },
  ],
  '渐变': [
    { id: 'g1', label: '蓝紫渐变', thumb: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200&q=60', full: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80' },
    { id: 'g2', label: '橙红渐变', thumb: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=200&q=60', full: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80' },
    { id: 'g3', label: '青绿渐变', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60', full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80' },
    { id: 'g4', label: '粉紫渐变', thumb: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&q=60', full: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80' },
    { id: 'g5', label: '日落渐变', thumb: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=200&q=60', full: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&q=80' },
    { id: 'g6', label: '星空', thumb: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&q=60', full: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80' },
  ],
  '纯色': [
    { id: 's1', label: '纯白', thumb: '', full: '' },
    { id: 's2', label: '浅灰', thumb: '', full: '' },
    { id: 's3', label: '深灰', thumb: '', full: '' },
    { id: 's4', label: '米色', thumb: '', full: '' },
    { id: 's5', label: '浅蓝', thumb: '', full: '' },
    { id: 's6', label: '薄荷绿', thumb: '', full: '' },
  ],
}

export const SOLID_COLORS: Record<string, string> = {
  's1': '#FFFFFF', 's2': '#E5E7EB', 's3': '#374151',
  's4': '#F5F0E8', 's5': '#DBEAFE', 's6': '#D1FAE5',
}

interface BgPickerProps {
  bgType: BgType
  bgColor: string
  selectedPreset: PresetBg | null
  customBgUrl: string | null
  onTypeChange: (t: BgType) => void
  onColorChange: (c: string) => void
  onPresetSelect: (p: PresetBg) => void
  onCustomUpload: (url: string) => void
}

export default function BgPicker({
  bgType, bgColor, selectedPreset, customBgUrl,
  onTypeChange, onColorChange, onPresetSelect, onCustomUpload,
}: BgPickerProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [activeCategory, setActiveCategory] = useState<PresetCategory>('自然')

  const handleCustomFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onCustomUpload(url)
    e.target.value = ''
  }

  const tabs: { key: BgType; label: string }[] = [
    { key: 'preset', label: '🖼 预设图库' },
    { key: 'color', label: '🎨 纯色' },
    { key: 'custom', label: '📁 自定义' },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* 类型切换 */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onTypeChange(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              bgType === tab.key
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 纯色 */}
      {bgType === 'color' && (
        <div className="flex items-center gap-4 flex-wrap">
          {['#FFFFFF', '#F3F4F6', '#1F2937', '#F5F0E8', '#DBEAFE', '#D1FAE5', '#FEE2E2', '#FEF9C3'].map(color => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                bgColor === color ? 'border-violet-500 ring-2 ring-violet-300 scale-110' : 'border-gray-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <div className="relative w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden hover:scale-105 transition-all cursor-pointer">
            <span className="absolute inset-0 flex items-center justify-center text-lg pointer-events-none">🎨</span>
            <input type="color" value={bgColor} onChange={e => onColorChange(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
          </div>
        </div>
      )}

      {/* 预设图库 */}
      {bgType === 'preset' && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            {PRESET_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat ? 'bg-violet-100 text-violet-700' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-6 gap-2">
            {PRESETS[activeCategory].map(preset => {
              const isSolid = preset.id.startsWith('s')
              const solidColor = SOLID_COLORS[preset.id]
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    if (isSolid) { onTypeChange('color'); onColorChange(solidColor) }
                    else onPresetSelect(preset)
                  }}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedPreset?.id === preset.id ? 'border-violet-500 ring-2 ring-violet-300' : 'border-transparent'
                  }`}
                  title={preset.label}
                >
                  {isSolid ? (
                    <div className="w-full h-full" style={{ backgroundColor: solidColor }} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={preset.thumb} alt={preset.label} className="w-full h-full object-cover" loading="lazy" />
                  )}
                  <span className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] text-center py-0.5 truncate">
                    {preset.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 自定义上传 */}
      {bgType === 'custom' && (
        <div className="flex flex-col gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-violet-400 hover:bg-violet-50 text-gray-500 hover:text-violet-600 transition-all"
          >
            <span className="text-xl">📁</span>
            <span className="text-sm font-medium">点击上传背景图</span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCustomFile} />
          {customBgUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={customBgUrl} alt="自定义背景" className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">已选择</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
