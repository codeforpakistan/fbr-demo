'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function PehchanLoginButton() {
  const handleLogin = () => {
    // Construct the login URL with required parameters
    const loginUrl = new URL(`${process.env.NEXT_PUBLIC_PEHCHAN_URL}/login`)
    
    // Add required parameters
    loginUrl.searchParams.set('service_name', 'FBR Tax Portal')
    loginUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_CLIENT_ID!)
    loginUrl.searchParams.set('redirect_uri', `${window.location.origin}/auth/callback`)
    loginUrl.searchParams.set('response_type', 'code')
    loginUrl.searchParams.set('scope', 'openid profile email')
    
    // Add state for security
    const state = crypto.randomUUID()
    sessionStorage.setItem('auth_state', state)
    loginUrl.searchParams.set('state', state)

    // Log for debugging
    console.log('Login URL:', loginUrl.toString())
    
    window.location.href = loginUrl.toString()
  }

  return (
    <Button 
      onClick={handleLogin}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 h-12"
    >
      <Image 
        src="/white_icon.svg" 
        alt="" 
        width={20} 
        height={20} 
        className="mr-2" 
      />
      Login with Pehchan
    </Button>
  )
}