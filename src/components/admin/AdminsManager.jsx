import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function AdminsManager() {
  const { admin: me, isSuperAdmin } = useAuth()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ email: '', role: 'admin' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase.from('admins').select('*').order('created_at', { ascending: true })
    setAdmins(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const add = async (e) => {
    e.preventDefault()
    setError('')
    const email = form.email.trim().toLowerCase()
    if (!email) return
    setBusy(true)
    try {
      const { error: err } = await supabase
        .from('admins')
        .insert({ email, role: form.role, added_by: me?.email || null })
      if (err) throw err
      setForm({ email: '', role: 'admin' })
      await load()
    } catch (err) {
      setError(err.message || 'Could not add admin.')
    } finally {
      setBusy(false)
    }
  }

  const changeRole = async (row, role) => {
    setError('')
    const { error: err } = await supabase.from('admins').update({ role }).eq('id', row.id)
    if (err) setError(err.message)
    else load()
  }

  const remove = async (row) => {
    setError('')
    if (row.email?.toLowerCase() === me?.email?.toLowerCase()) {
      setError("You can't remove your own admin access.")
      return
    }
    const supers = admins.filter((a) => a.role === 'super_admin')
    if (row.role === 'super_admin' && supers.length <= 1) {
      setError('You must keep at least one super-admin.')
      return
    }
    if (!window.confirm(`Remove admin access for ${row.email}?`)) return
    const { error: err } = await supabase.from('admins').delete().eq('id', row.id)
    if (err) setError(err.message)
    else load()
  }

  if (!isSuperAdmin) {
    return (
      <div className="rounded-xl border border-gold/20 bg-gold/5 p-6 text-cream/75">
        <h2 className="font-serif text-xl text-cream">Admins</h2>
        <p className="mt-2 text-sm">
          Only a <span className="text-gold">super-admin</span> can add or remove admins. Ask a
          super-admin if you need access changed.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-serif text-2xl font-semibold text-cream">Admins</h2>
        <p className="max-w-2xl text-sm text-cream/55">
          Admins are matched by email. To fully activate access, the person also needs a Supabase
          Auth account with the same email (invite them from the Supabase dashboard, or they sign
          in). Super-admins can add/remove admins — so access passes to next year's team by role.
        </p>
      </div>

      {/* Add form */}
      <form onSubmit={add} className="mb-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-night-900/40 p-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="newadmin@rajalakshmi.edu.in"
          />
        </div>
        <div className="sm:w-48">
          <label className="label">Role</label>
          <select
            className="input"
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          >
            <option value="admin">Admin</option>
            <option value="super_admin">Super-admin</option>
          </select>
        </div>
        <button type="submit" className="btn-gold" disabled={busy}>
          {busy ? 'Adding…' : 'Add admin'}
        </button>
      </form>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="bg-night-900/70 text-xs uppercase tracking-wider text-cream/50">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Added by</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-cream/40">Loading…</td></tr>
            )}
            {!loading && admins.map((a) => {
              const isMe = a.email?.toLowerCase() === me?.email?.toLowerCase()
              return (
                <tr key={a.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3 text-cream/85">
                    {a.email} {isMe && <span className="chip ml-2">you</span>}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="rounded-md border border-white/10 bg-night-900/60 px-2 py-1 text-cream/80"
                      value={a.role}
                      onChange={(e) => changeRole(a, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super-admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-cream/60">{a.added_by || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => remove(a)} className="text-red-400 hover:underline">
                      Remove
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
