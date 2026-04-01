'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'

export default function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '57700627465-jgt03dnv2d739rovmbe394ckqsigstde.apps.googleusercontent.com'
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  )
}
