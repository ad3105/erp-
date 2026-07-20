import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import EventCard from '../components/EventCard'
import EventModal from '../components/EventModal'
import { useContent } from '../hooks/useContent'
import { isUpcoming, byDateAsc, byDateDesc } from '../lib/utils'

export default function Events() {
  const { events } = useContent()
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('all') // all | upcoming | past

  const { upcoming, past } = useMemo(() => {
    const up = events.filter(isUpcoming).sort(byDateAsc)
    const pa = events.filter((e) => !isUpcoming(e)).sort(byDateDesc)
    return { upcoming: up, past: pa }
  }, [events])

  const showUpcoming = filter !== 'past' && upcoming.length > 0
  const showPast = filter !== 'upcoming' && past.length > 0

  const Tab = ({ id, label, count }) => (
    <button
      onClick={() => setFilter(id)}
      className={`rounded-full px-5 py-2 text-sm font-medium transition ${
        filter === id ? 'bg-gold-gradient text-night-900 shadow-gold' : 'text-cream/70 hover:text-gold'
      }`}
    >
      {label} {count != null && <span className="opacity-70">({count})</span>}
    </button>
  )

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Our Events"
        subtitle="Every project is a promise kept to our community. Tap any card for the full story."
      >
        <div className="mt-8 inline-flex rounded-full border border-gold/30 bg-night-900/60 p-1">
          <Tab id="all" label="All" count={events.length} />
          <Tab id="upcoming" label="Upcoming" count={upcoming.length} />
          <Tab id="past" label="Past" count={past.length} />
        </div>
      </PageHeader>

      <div className="container-x py-16 sm:py-20">
        {showUpcoming && (
          <section className="mb-16">
            <Reveal>
              <h2 className="mb-8 font-serif text-2xl font-semibold text-cream sm:text-3xl">
                <span className="text-gold">Upcoming</span> Events
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((e, i) => (
                <Reveal key={e.id} delay={(i % 3) * 100}>
                  <EventCard event={e} onOpen={setActive} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {showPast && (
          <section>
            <Reveal>
              <h2 className="mb-8 font-serif text-2xl font-semibold text-cream sm:text-3xl">
                <span className="text-gold">Past</span> Events
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((e, i) => (
                <Reveal key={e.id} delay={(i % 3) * 100}>
                  <EventCard event={e} onOpen={setActive} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {!showUpcoming && !showPast && (
          <p className="py-20 text-center text-cream/60">No events to show.</p>
        )}
      </div>

      <EventModal event={active} onClose={() => setActive(null)} />
    </>
  )
}
