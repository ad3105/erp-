import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/Section'
import EventCard from '../components/EventCard'
import EventModal from '../components/EventModal'
import { CrestLogo, CollegeLogo, LionsLogo } from '../components/Logos'
import { useContent } from '../hooks/useContent'
import { CLUB, STATS } from '../data/seed'
import { isUpcoming, byDateAsc, byDateDesc, placeholderGradient } from '../lib/utils'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="container-x relative grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="chip">{CLUB.district}</span>
            <span className="chip">Lions Clubs International</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl lg:text-6xl"
          >
            Leo Club of{' '}
            <span className="text-gold-shimmer">Rajalakshmi Engineering College</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75"
          >
            <span className="italic text-gold">“{CLUB.tagline}.”</span> A student community
            service club inspiring and empowering to make a difference — one act of service at a
            time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link to="/join" className="btn-gold">
              Join the Pride
            </Link>
            <Link to="/events" className="btn-outline">
              Explore our work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex items-center gap-5"
          >
            <CollegeLogo className="h-11 w-11" />
            <div className="h-8 w-px bg-gold/30" />
            <LionsLogo className="h-11 w-11" />
            <p className="max-w-[16rem] text-xs leading-relaxed text-cream/50">
              A club of {CLUB.college}, chartered under {CLUB.parent}.
            </p>
          </motion.div>
        </div>

        {/* Crest showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden max-w-md lg:block"
        >
          <div className="absolute inset-0 animate-float rounded-full bg-gold/10 blur-2xl" />
          <div className="relative grid place-items-center rounded-3xl border border-gold/20 bg-white/[0.02] p-12 backdrop-blur-sm">
            <CrestLogo className="h-64 w-64 animate-float" />
            <p className="mt-6 text-center font-serif text-xl italic text-gold">
              We're better together
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatStrip() {
  return (
    <section className="border-y border-gold/15 bg-night-900/40">
      <div className="container-x grid grid-cols-2 gap-6 py-10 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.key} delay={i * 80} className="text-center">
            <p className="font-serif text-4xl font-semibold text-gold sm:text-5xl">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-cream/60 sm:text-sm">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Intro() {
  return (
    <section className="container-x py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow mb-3">Who we are</p>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            A pride of young leaders serving Chennai
          </h2>
          <div className="gold-divider ml-0 mt-5" />
          <p className="mt-6 leading-relaxed text-cream/75">
            The Leo Club of REC is the student wing of Lions Clubs International at Rajalakshmi
            Engineering College. <strong className="text-gold">Leo</strong> stands for{' '}
            <em>Leadership, Experience, Opportunity</em> — and that is exactly what we offer: a
            platform for students to lead real community-service projects, from orphanage visits and
            food drives to festival donation campaigns.
          </p>
          <blockquote className="mt-6 border-l-2 border-gold/50 pl-4 text-cream/70">
            {CLUB.mottos.map((m) => (
              <p key={m} className="italic">
                “{m}.”
              </p>
            ))}
          </blockquote>
          <Link to="/about" className="btn-ghost mt-6 !px-0">
            Read our story →
          </Link>
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-2 gap-4">
          {[
            ['Leadership', 'Students run every project end to end.'],
            ['Experience', 'Real service across the city, every month.'],
            ['Opportunity', 'Grow, connect and make a difference.'],
            ['Impact', 'Thousands served across 5 years.'],
          ].map(([t, d], i) => (
            <div key={t} className={`card p-5 ${i % 2 ? 'sm:translate-y-6' : ''}`}>
              <p className="font-serif text-lg font-semibold text-gold">{t}</p>
              <p className="mt-2 text-sm text-cream/65">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function UpcomingPreview({ onOpen }) {
  const { events } = useContent()
  const upcoming = events.filter(isUpcoming).sort(byDateAsc).slice(0, 3)
  const list = upcoming.length
    ? upcoming
    : [...events].sort(byDateDesc).slice(0, 3) // fall back to most recent

  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHeading
        eyebrow={upcoming.length ? 'What’s next' : 'Recent work'}
        title={upcoming.length ? 'Upcoming Events' : 'Latest Events'}
        subtitle="From donation drives to orphanage visits — here’s where you’ll find us next."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e, i) => (
          <Reveal key={e.id} delay={i * 100}>
            <EventCard event={e} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Link to="/events" className="btn-outline">
          View all events
        </Link>
      </Reveal>
    </section>
  )
}

function ShresthaBand({ onOpen }) {
  const { events } = useContent()
  const shrestha =
    events.find((e) => e.slug === 'shrestha-6') ||
    events.find((e) => e.slug === 'shrestha-25') ||
    events.find((e) => /shrestha/i.test(e.name))

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute inset-0"
        style={{ background: placeholderGradient('shrestha-diwali') }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night-950 via-night-950/85 to-night-950/40" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />

      <div className="container-x relative">
        <Reveal className="max-w-2xl">
          <span className="chip bg-gold text-night-900">Signature Annual Event</span>
          <h2 className="mt-5 font-serif text-4xl font-semibold text-cream sm:text-5xl">
            SHRESTHA <span className="text-gold-shimmer">5.0</span>
          </h2>
          <p className="mt-2 text-lg font-medium text-gold">A Diwali of giving — 5 years strong.</p>
          <p className="mt-5 max-w-xl leading-relaxed text-cream/80">
            Every Diwali, campus-wide donation stalls collect everyday essentials that we carry to
            orphanages across Chennai. Now in its fifth consecutive year, SHRESTHA has become the
            heartbeat of our club — turning the festival of lights into a festival of service.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {shrestha && (
              <button onClick={() => onOpen(shrestha)} className="btn-gold">
                About SHRESTHA
              </button>
            )}
            <Link to="/achievements" className="btn-outline">
              Our milestones
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function GalleryTeaser() {
  const { gallery, events } = useContent()
  const tiles = gallery.slice(0, 6)

  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHeading
        eyebrow="Moments"
        title="From the Gallery"
        subtitle="A glimpse of the smiles, service and celebrations along the way."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {(tiles.length ? tiles : events.slice(0, 6)).map((item, i) => (
          <Reveal key={item.id} delay={i * 60}>
            <div className="aspect-square overflow-hidden rounded-xl border border-white/5">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title || ''} className="h-full w-full object-cover transition duration-700 hover:scale-110" loading="lazy" />
              ) : (
                <div className="grid h-full w-full place-items-center p-2 text-center" style={{ background: placeholderGradient(item.slug || item.name || String(i)) }}>
                  <span className="font-serif text-xs text-gold/60">{item.name || 'Photo'}</span>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Link to="/gallery" className="btn-outline">
          Open full gallery
        </Link>
      </Reveal>
    </section>
  )
}

export default function Home() {
  const [active, setActive] = useState(null)
  return (
    <>
      <Hero />
      <StatStrip />
      <Intro />
      <UpcomingPreview onOpen={setActive} />
      <ShresthaBand onOpen={setActive} />
      <GalleryTeaser />
      <EventModal event={active} onClose={() => setActive(null)} />
    </>
  )
}
