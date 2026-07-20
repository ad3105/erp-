import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CrestLogo } from '../components/Logos'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn, isAdmin, configured, loading } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (isAdmin) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await signIn(form.email.trim(), form.password)
    } catch (err) {
      setError(err.message || 'Unable to sign in.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <CrestLogo className="mx-auto h-20 w-20" />
          </Link>
          <h1 className="mt-5 font-serif text-3xl font-semibold text-cream">Admin Login</h1>
          <p className="mt-2 text-sm text-cream/60">
            For approved Leo Club of REC members only.
          </p>
        </div>

        <div className="card p-7 sm:p-8">
          {!configured && (
            <div className="mb-6 rounded-lg border border-gold/30 bg-gold/5 p-4 text-sm text-cream/75">
              <strong className="text-gold">Demo mode.</strong> Login is disabled until Supabase is
              connected. Follow the README setup steps, then create an admin user.
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                autoComplete="username"
                required
                disabled={!configured || busy}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@rajalakshmi.edu.in"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                autoComplete="current-password"
                required
                disabled={!configured || busy}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <button type="submit" className="btn-gold w-full" disabled={!configured || busy || loading}>
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-cream/50">
          <Link to="/" className="hover:text-gold">
            ← Back to the site
          </Link>
        </p>
      </div>
    </div>
  )
}
