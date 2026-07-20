import Modal from './Modal'
import { formatDate, placeholderGradient } from '../lib/utils'

export default function EventModal({ event, onClose }) {
  if (!event) return null
  return (
    <Modal open={Boolean(event)} onClose={onClose} maxWidth="max-w-3xl">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
        {event.poster_url ? (
          <img src={event.poster_url} alt={event.name} className="h-full w-full object-cover" />
        ) : (
          <div
            className="grid h-full w-full place-items-center"
            style={{ background: placeholderGradient(event.slug || event.name) }}
          >
            <span className="font-serif text-3xl font-semibold text-gold/70">{event.name}</span>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-night-950/70 text-cream backdrop-blur transition hover:text-gold"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {event.featured && (
          <span className="absolute left-4 top-4 chip bg-gold text-night-900">Signature Event</span>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-sm font-medium text-gold">{formatDate(event.date, event.end_date)}</p>
        <h3 className="mt-1 font-serif text-3xl font-semibold text-cream">{event.name}</h3>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" />
            </svg>
            {event.venue}
          </span>
          {event.lead && (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
              </svg>
              Lead: {event.lead}
            </span>
          )}
          {event.tenure && <span className="chip">{event.tenure} tenure</span>}
        </div>

        <p className="mt-5 leading-relaxed text-cream/80">{event.description}</p>

        {Array.isArray(event.highlights) && event.highlights.length > 0 && (
          <div className="mt-6">
            <p className="eyebrow mb-3">Highlights</p>
            <ul className="space-y-2">
              {event.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-cream/75">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4 10-10" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  )
}
