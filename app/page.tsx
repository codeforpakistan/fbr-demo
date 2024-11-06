import Image from 'next/image'
import { PehchanLoginButton } from '@/components/pehchan-login-button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/fbr-logo.png" 
              alt="FBR Logo" 
              width={40} 
              height={40}
            />
            <h1 className="text-2xl font-bold text-gray-900">FBR Tax Portal</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to FBR Tax Portal</h2>
          <p className="text-gray-600 mb-8">
            Please login with your Pehchan ID to access tax filing services
          </p>
          <PehchanLoginButton />
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Easy Tax Filing</h3>
            <p className="text-gray-600">File your taxes seamlessly with your Pehchan ID</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Secure Access</h3>
            <p className="text-gray-600">Your data is protected with government-grade security</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Quick Processing</h3>
            <p className="text-gray-600">Get your tax returns processed faster</p>
          </div>
        </div>
      </main>
    </div>
  )
}
