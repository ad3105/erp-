import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Whether Supabase has been configured via environment variables.
 * When false, the app runs in "demo mode" using built-in seed data and
 * disables login / persistence (so the site still previews perfectly).
 */
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null

/** Name of the storage bucket used for uploaded images. */
export const STORAGE_BUCKET = 'media'

/**
 * Upload a File to Supabase Storage and return its public URL.
 * @param {File} file
 * @param {string} folder  e.g. "events", "members", "gallery"
 */
export async function uploadImage(file, folder = 'uploads') {
  if (!supabase) throw new Error('Supabase is not configured.')
  const ext = file.name.split('.').pop()
  const name = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(name, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(name)
  return data.publicUrl
}
