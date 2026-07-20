import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import {
  TENURES as SEED_TENURES,
  MEMBERS as SEED_MEMBERS,
  EVENTS as SEED_EVENTS,
  ACHIEVEMENTS as SEED_ACHIEVEMENTS,
  ANNOUNCEMENTS as SEED_ANNOUNCEMENTS,
  GALLERY as SEED_GALLERY,
} from '../data/seed'

const ContentContext = createContext(null)

// Give seed rows deterministic ids so React keys + editing work in demo mode.
const withIds = (rows, prefix) =>
  rows.map((r, i) => ({ id: r.id ?? `${prefix}-${i + 1}`, ...r }))

const TABLES = ['tenures', 'members', 'events', 'gallery', 'announcements', 'achievements']

export function ContentProvider({ children }) {
  const [data, setData] = useState({
    tenures: withIds(SEED_TENURES, 'tenure'),
    members: withIds(SEED_MEMBERS, 'member'),
    events: withIds(SEED_EVENTS, 'event'),
    gallery: withIds(SEED_GALLERY, 'gallery'),
    announcements: withIds(SEED_ANNOUNCEMENTS, 'ann'),
    achievements: withIds(SEED_ACHIEVEMENTS, 'ach'),
  })
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const fetchAll = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    try {
      const results = await Promise.all(
        TABLES.map((t) => supabase.from(t).select('*')),
      )
      const next = {}
      TABLES.forEach((t, i) => {
        const { data: rows, error } = results[i]
        // If a table hasn't been created yet, keep the seed fallback.
        next[t] = error || !rows ? data[t] : rows
      })
      setData((prev) => ({ ...prev, ...next }))
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSupabaseConfigured) fetchAll()
  }, [fetchAll])

  // ── Generic CRUD (writes hit Supabase; RLS enforces admin-only) ──
  const create = async (table, row) => {
    if (!supabase) throw new Error('Connect Supabase to save changes.')
    const { data: inserted, error } = await supabase
      .from(table)
      .insert(row)
      .select()
      .single()
    if (error) throw error
    setData((p) => ({ ...p, [table]: [...p[table], inserted] }))
    return inserted
  }

  const update = async (table, id, patch) => {
    if (!supabase) throw new Error('Connect Supabase to save changes.')
    const { data: updated, error } = await supabase
      .from(table)
      .update(patch)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    setData((p) => ({
      ...p,
      [table]: p[table].map((r) => (r.id === id ? updated : r)),
    }))
    return updated
  }

  const remove = async (table, id) => {
    if (!supabase) throw new Error('Connect Supabase to save changes.')
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
    setData((p) => ({ ...p, [table]: p[table].filter((r) => r.id !== id) }))
  }

  const value = useMemo(
    () => ({ ...data, loading, configured: isSupabaseConfigured, refresh: fetchAll, create, update, remove }),
    [data, loading, fetchAll],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export const useContent = () => useContext(ContentContext)
