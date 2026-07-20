/** Format an ISO date (optionally a range) into "24 Sep 2025". */
export function formatDate(iso, endIso) {
  if (!iso) return ''
  const opts = { day: '2-digit', month: 'short', year: 'numeric' }
  const start = new Date(iso).toLocaleDateString('en-GB', opts)
  if (endIso) {
    const end = new Date(endIso).toLocaleDateString('en-GB', opts)
    return `${start} – ${end}`
  }
  return start
}

/** Is this event in the future (relative to today)? */
export function isUpcoming(event) {
  const ref = event.end_date || event.date
  if (!ref) return false
  const d = new Date(ref)
  d.setHours(23, 59, 59, 999)
  return d.getTime() >= Date.now()
}

/** Sort helper by date. */
export const byDateAsc = (a, b) => new Date(a.date) - new Date(b.date)
export const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date)

/** Deterministic soft gradient for image placeholders, keyed by a string. */
export function placeholderGradient(seed = '') {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360
  return `linear-gradient(135deg, hsl(${h}, 30%, 18%), hsl(${(h + 40) % 360}, 35%, 10%))`
}

/** Initials from a name, e.g. "Leo Aditi" → "LA". */
export function initials(name = '') {
  return name
    .replace(/^Leo\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}
