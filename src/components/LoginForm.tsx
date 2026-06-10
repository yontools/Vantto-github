'use client'
import { useState } from 'react'
import { signInWithOtp } from '@/app/actions'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append('email', email)
    const result = await signInWithOtp(formData)
    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-[#0a0f0d]">
            vantto<span className="text-[#10b981]">.</span>
          </h1>
          <p className="mt-3 text-sm text-gray-500 font-sans">Gestión logística de activos.</p>
        </div>

        <div className="border border-neutral-200 rounded-lg p-8">
          {success ? (
            <div className="text-center space-y-3">
              <div className="text-4xl text-emerald-500">✉️</div>
              <h3 className="font-semibold text-[#0a0f0d] font-sans">Revisá tu email</h3>
              <p className="text-sm text-gray-600 font-sans">Te enviamos un link para ingresar.</p>
              <button onClick={() => setSuccess(false)} className="text-xs text-emerald-700 underline cursor-pointer">
                Intentar con otro email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 text-sm p-3 rounded-md font-sans">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2 font-sans">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  className="w-full border border-neutral-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#10b981] focus:border-[#10b981] font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#0a0f0d] text-white py-3 rounded-md text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                {loading ? 'Enviando...' : 'Ingresar con link mágico'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[10px] text-gray-400 font-mono">
          VANTTO LOGÍSTICA • NEUQUÉN, ARGENTINA • © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
