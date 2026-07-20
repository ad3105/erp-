import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [admin, setAdmin] = useState(null) // row from `admins` table
  const [loading, setLoading] = useState(true)

  // Load the admin row for the signed-in user (also confirms they are allowed
  // in). Admins are identified by email, so access passes to next year's team
  // by role/email — no per-person wiring needed.
  const loadAdmin = useCallback(async (user) => {
    if (!supabase || !user?.email) {
      setAdmin(null)
      return
    }
    const { data } = await supabase
      .from('admins')
      .select('*')
      .ilike('email', user.email)
      .maybeSingle()
    setAdmin(data || null)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      await loadAdmin(data.session?.user)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, s) => {
      setSession(s)
      await loadAdmin(s?.user)
    })
    return () => sub.subscription.unsubscribe()
  }, [loadAdmin])

  const signIn = async (email, password) => {
    if (!supabase) throw new Error('Supabase is not configured. See README setup steps.')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setAdmin(null)
  }

  const value = {
    session,
    user: session?.user ?? null,
    admin,
    isAdmin: Boolean(admin),
    isSuperAdmin: admin?.role === 'super_admin',
    loading,
    configured: isSupabaseConfigured,
    signIn,
    signOut,
    refreshAdmin: () => loadAdmin(session?.user),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
