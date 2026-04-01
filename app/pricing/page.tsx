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
            <h1 className="text-lg font-bold text-gray-900">AI Background Remover</h1>
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-violet-600 underline">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Plan</h2>
          <p className="text-gray-500">Professional AI background removal for stunning photos</p>
        </div>

        {/* 定价卡片 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* 免费版 */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$0</div>
              <p className="text-sm text-gray-500">Forever free</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">3 free uses per month</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">Save last 50 history</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">24 preset backgrounds</span>
              </li>
            </ul>
            <Link href="/" className="block w-full py-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Get Started
            </Link>
          </div>

          {/* 基础版 */}
          <div className="bg-white rounded-2xl border-2 border-violet-300 p-6 shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-500 text-white text-xs px-3 py-1 rounded-full">
              Popular
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic</h3>
              <div className="text-4xl font-bold text-violet-600 mb-1">$9.9</div>
              <p className="text-sm text-gray-500">per month</p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">50 uses per month</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">Permanent history storage</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">Priority processing</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">Ad-free experience</span>
              </li>
            </ul>
            <button className="block w-full py-3 text-center bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium">
              Subscribe Now
            </button>
          </div>

          {/* 专业版 */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$99</div>
              <p className="text-sm text-gray-500">per year <span className="text-violet-600">Save 17%</span></p>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600"><strong>Unlimited</strong> uses</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">Permanent history storage</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">Batch processing (coming soon)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-gray-600">Priority support</span>
              </li>
            </ul>
            <button className="block w-full py-3 text-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">FAQ</h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ Can I use without signing in?</h4>
              <p className="text-gray-600 text-sm">Yes, you can try 1 time. Sign in to get 3 free uses per month.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ When does the free quota reset?</h4>
              <p className="text-gray-600 text-sm">Resets on the 1st of each month. Unused quota does not carry over.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ Can I get a refund?</h4>
              <p className="text-gray-600 text-sm">Full refund within 7 days if unused. No refunds after use.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ Are my images saved?</h4>
              <p className="text-gray-600 text-sm">No. All images are processed locally in your browser. Servers do not store any image data.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">❓ What payment methods are supported?</h4>
              <p className="text-gray-600 text-sm">We accept PayPal, credit cards, and other major payment methods.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
