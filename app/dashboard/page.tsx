'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast'

interface UserInfo {
  sub: string
  email: string
  name: string
  profile?: {
    cnic: string
    phone: string
  }
}

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check authentication
    const accessToken = localStorage.getItem('access_token')
    const storedUserInfo = localStorage.getItem('user_info')
    
    if (!accessToken || !storedUserInfo) {
      router.push('/')
      return
    }
    
    setUserInfo(JSON.parse(storedUserInfo))
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    })
    router.push('/')
  }

  if (!userInfo) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">FBR Tax Portal</CardTitle>
          <Button 
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold">Name:</span>
              <span className="col-span-2">{userInfo.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold">Email:</span>
              <span className="col-span-2">{userInfo.email}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold">CNIC:</span>
              <span className="col-span-2">{userInfo.profile?.cnic}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="font-semibold">Phone:</span>
              <span className="col-span-2">{userInfo.profile?.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Filing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              You can now proceed with your tax filing. Your information has been pre-filled from your Pehchan ID.
            </p>
            <Button className="w-full">Start Tax Filing</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 