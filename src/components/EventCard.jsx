import { motion } from 'framer-motion'
import { formatDate, placeholderGradient } from '../lib/utils'

function PosterFallback({ event }) {
  return (
    <div
      className="grid h-full w-full place-items-center"
      style={{ background: placeholderGradient(event.slug || event.name) }}
    >
      <span className="px-4 text-center font-serif text-2xl font-semibold text-gold/70">
        {event.name}
      </span>
    </div>
  )
}

export default function EventCard({ event, onOpen }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(event)}
      className="card card-hover group overflow-hidden text-left"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {event.poster_url ? (
          <img
            src={event.poster_url}
            alt={event.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <PosterFallback event={event} />
        )}
        {event.featured && (
          <span className="absolute left-3 top-3 chip bg-gold text-night-900">Signature</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-xs font-medium text-gold">{formatDate(event.date, event.end_date)}</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-cream">{event.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1.5 text-xs text-cream/55">
          <svg className="h-3.5 w-3.5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {event.venue}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/65">{event.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold opacity-0 transition group-hover:opacity-100">
          View details →
        </span>
      </div>
    </motion.button>
  )
}
