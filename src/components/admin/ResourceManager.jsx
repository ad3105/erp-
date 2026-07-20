import { useState } from 'react'
import Modal from '../Modal'
import { useContent } from '../../hooks/useContent'
import { uploadImage } from '../../lib/supabase'

/**
 * Generic admin CRUD manager driven by a `fields` schema.
 *
 * field: {
 *   key, label,
 *   type: 'text'|'textarea'|'date'|'number'|'select'|'checkbox'|'image'|'tags',
 *   options?: [{value,label}],   // for select
 *   folder?: string,             // for image upload
 *   placeholder?, help?, half?   // half = half-width on desktop
 * }
 */
export default function ResourceManager({
  table,
  title,
  fields,
  emptyRow,
  listColumns,
  sortBy,
  keepId = false, // true when the primary key is user-supplied (e.g. tenures)
}) {
  const content = useContent()
  const rows = [...(content[table] || [])].sort((a, b) => {
    if (!sortBy) return 0
    const av = a[sortBy.key]
    const bv = b[sortBy.key]
    const cmp = av > bv ? 1 : av < bv ? -1 : 0
    return sortBy.dir === 'desc' ? -cmp : cmp
  })

  const [editing, setEditing] = useState(null) // row being edited or emptyRow for new
  const [draft, setDraft] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const openNew = () => {
    setDraft({ ...emptyRow })
    setEditing('new')
    setError('')
  }
  const openEdit = (row) => {
    setDraft({ ...row })
    setEditing(row.id)
    setError('')
  }
  const close = () => {
    setEditing(null)
    setDraft(null)
    setError('')
  }

  const setField = (key, value) => setDraft((d) => ({ ...d, [key]: value }))

  const handleImage = async (field, file) => {
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const url = await uploadImage(file, field.folder || table)
      setField(field.key, url)
    } catch (err) {
      setError(`Image upload failed: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    // Strip client-only id for inserts
    const payload = { ...draft }
    try {
      if (editing === 'new') {
        if (!keepId) delete payload.id
        await content.create(table, payload)
      } else {
        delete payload.id // never update the primary key
        await content.update(table, editing, payload)
      }
      close()
    } catch (err) {
      setError(err.message || 'Save failed.')
    } finally {
      setBusy(false)
    }
  }

  const del = async (row) => {
    if (!window.confirm(`Delete this ${title.replace(/s$/, '').toLowerCase()}? This cannot be undone.`)) return
    try {
      await content.remove(table, row.id)
    } catch (err) {
      alert(err.message || 'Delete failed.')
    }
  }

  const renderCell = (row, col) => {
    const v = row[col.key]
    if (col.render) return col.render(row)
    if (Array.isArray(v)) return v.length ? `${v.length} item(s)` : '—'
    if (typeof v === 'boolean') return v ? 'Yes' : 'No'
    return v ?? '—'
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-cream">{title}</h2>
          <p className="text-sm text-cream/50">{rows.length} item(s)</p>
        </div>
        <button onClick={openNew} className="btn-gold !px-5 !py-2.5">
          + Add {title.replace(/s$/, '')}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-night-900/70 text-xs uppercase tracking-wider text-cream/50">
            <tr>
              {listColumns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.length === 0 && (
              <tr>
                <td colSpan={listColumns.length + 1} className="px-4 py-8 text-center text-cream/40">
                  Nothing here yet. Click “Add {title.replace(/s$/, '')}”.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.03]">
                {listColumns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-cream/80">
                    {renderCell(row, c)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(row)} className="text-gold hover:underline">
                    Edit
                  </button>
                  <button onClick={() => del(row)} className="ml-4 text-red-400 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={Boolean(editing)} onClose={close} maxWidth="max-w-2xl">
        {draft && (
          <form onSubmit={save} className="p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-semibold text-cream">
              {editing === 'new' ? `Add ${title.replace(/s$/, '')}` : `Edit ${title.replace(/s$/, '')}`}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.half ? 'sm:col-span-1' : 'sm:col-span-2'}>
                  <label className="label">{f.label}</label>
                  <FieldInput
                    field={f}
                    value={draft[f.key]}
                    onChange={(v) => setField(f.key, v)}
                    onImage={(file) => handleImage(f, file)}
                    busy={busy}
                  />
                  {f.help && <p className="mt-1 text-xs text-cream/40">{f.help}</p>}
                </div>
              ))}
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <div className="mt-7 flex justify-end gap-3">
              <button type="button" onClick={close} className="btn-ghost">
                Cancel
              </button>
              <button type="submit" className="btn-gold" disabled={busy}>
                {busy ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}

function FieldInput({ field, value, onChange, onImage, busy }) {
  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          className="input min-h-[100px]"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      )
    case 'tags':
      return (
        <textarea
          className="input min-h-[90px]"
          value={Array.isArray(value) ? value.join('\n') : value ?? ''}
          onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
          placeholder={field.placeholder || 'One item per line'}
        />
      )
    case 'number':
      return (
        <input
          type="number"
          className="input"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
          placeholder={field.placeholder}
        />
      )
    case 'date':
      return (
        <input type="date" className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      )
    case 'select':
      return (
        <select className="input" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">— select —</option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )
    case 'checkbox':
      return (
        <label className="mt-2 inline-flex items-center gap-2 text-sm text-cream/80">
          <input
            type="checkbox"
            className="h-4 w-4 accent-gold"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          {field.checkboxLabel || 'Enabled'}
        </label>
      )
    case 'image':
      return (
        <div className="space-y-2">
          {value && (
            <img src={value} alt="" className="h-24 w-24 rounded-lg border border-white/10 object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={(e) => onImage(e.target.files?.[0])}
            className="block w-full text-sm text-cream/70 file:mr-3 file:rounded-full file:border-0 file:bg-gold/20 file:px-4 file:py-1.5 file:text-gold"
          />
          <input
            className="input text-xs"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste an image URL"
          />
        </div>
      )
    default:
      return (
        <input
          className="input"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      )
  }
}
