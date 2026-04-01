import type { Metadata } from 'next'
import './globals.css'
import GoogleAuthProvider from '@/components/GoogleAuthProvider'

export const metadata: Metadata = {
  title: 'AI Background Remover - Free Online Photo Background Removal Tool',
  description: 'Free online AI background remover. Support natural, urban, gradient preset backgrounds, or upload custom backgrounds. AI auto remove, instant preview, one-click download.',
  keywords: 'background remover, remove background, AI background removal, photo editor, portrait background',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <GoogleAuthProvider>{children}</GoogleAuthProvider>
      </body>
    </html>
  )
}
