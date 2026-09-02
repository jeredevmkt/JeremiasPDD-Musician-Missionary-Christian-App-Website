'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const ADMIN_PASSWORD = 'official-y.e'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password === ADMIN_PASSWORD) {
      // Set session flag
      sessionStorage.setItem('admin_authenticated', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
    
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center pt-16 px-4 bg-dark">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Panel</h1>
          <p className="text-gray-400">Manager Login</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark/50 border border-primary/30 rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white focus:border-primary outline-none transition"
              placeholder="Enter password"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 bg-primary hover:bg-primary/90 disabled:bg-gray-600 rounded-lg text-white font-semibold transition"
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          This is a protected login page. For administrators only.
        </p>
      </div>
    </main>
  )
}