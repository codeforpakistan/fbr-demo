'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export default function AuthCallback() {
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        
        // Check for direct token response first (implicit flow)
        const accessToken = params.get('access_token')
        const idToken = params.get('id_token')

        if (accessToken) {
          // We received tokens directly
          localStorage.setItem('access_token', accessToken)
          if (idToken) localStorage.setItem('id_token', idToken)

          // Fetch user info
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_PEHCHAN_URL}/api/auth/userinfo`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          })

          if (!userResponse.ok) {
            throw new Error('Failed to fetch user info')
          }

          const userInfo = await userResponse.json()
          localStorage.setItem('user_info', JSON.stringify(userInfo))

          toast({
            title: "Login successful",
            description: "Welcome to FBR Tax Portal"
          })

          router.push('/dashboard')
          return
        }

        // If no direct tokens, check for authorization code flow
        const code = params.get('code')
        const state = params.get('state')
        const error = params.get('error')
        const storedState = sessionStorage.getItem('auth_state')

        // Check for errors
        if (error) {
          throw new Error(error)
        }

        // For code flow
        if (code) {
          // Validate state if present
          if (state && state !== storedState) {
            throw new Error('Invalid state parameter')
          }

          // Exchange code for tokens
          const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_PEHCHAN_URL}/api/token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
              redirect_uri: `${window.location.origin}/auth/callback`,
              grant_type: 'authorization_code',
            }),
          })

          if (!tokenResponse.ok) {
            throw new Error('Token exchange failed')
          }

          const tokens = await tokenResponse.json()

          // Store tokens and proceed as before
          localStorage.setItem('access_token', tokens.access_token)
          localStorage.setItem('id_token', tokens.id_token)

          // Fetch user info
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_PEHCHAN_URL}/api/auth/userinfo`, {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`
            }
          })

          if (!userResponse.ok) {
            throw new Error('Failed to fetch user info')
          }

          const userInfo = await userResponse.json()
          localStorage.setItem('user_info', JSON.stringify(userInfo))

          toast({
            title: "Login successful",
            description: "Welcome to FBR Tax Portal"
          })

          router.push('/dashboard')
          return
        }

        // If we get here, no valid authentication data was received
        throw new Error('No valid authentication data received')

      } catch (error) {
        console.error('Auth callback error:', error)
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: error instanceof Error ? error.message : "An error occurred during login"
        })
        router.push('/')
      } finally {
        sessionStorage.removeItem('auth_state')
        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [router, toast])

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your login...</p>
        </div>
      </div>
    )
  }

  return null
}