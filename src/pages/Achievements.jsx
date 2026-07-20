import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/Section'
import { useContent } from '../hooks/useContent'

export default function Achievements() {
  const { achievements, announcements } = useContent()
  const sorted = [...achievements].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  const activeAnnouncements = announcements.filter((a) => a.active)

  return (
    <>
      <PageHeader
        eyebrow="Milestones"
        title="Achievements & Highlights"
        subtitle="Five years of service, measured in the lives we've touched and the community we've built."
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {sorted.map((a, i) => (
            <Reveal key={a.id} delay={(i % 2) * 100}>
              <div className="card card-hover flex h-full items-start gap-5 p-7">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-gold/30 bg-gold/5">
                  <span className="font-serif text-xl font-semibold text-gold">{a.value}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-cream">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{a.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SHRESTHA spotlight */}
      <section className="border-y border-gold/15 bg-night-900/40 py-16 sm:py-20">
        <div className="container-x text-center">
          <Reveal>
            <span className="chip bg-gold text-night-900">Flagship</span>
            <h2 className="mt-5 font-serif text-4xl font-semibold text-cream sm:text-5xl">
              5 Years of <span className="text-gold-shimmer">SHRESTHA</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-cream/75">
              What began as a single Diwali donation drive has grown into our proudest tradition —
              five consecutive years of turning festive generosity into real support for orphanages
              across Chennai.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Announcements */}
      {activeAnnouncements.length > 0 && (
        <section className="container-x py-16 sm:py-20">
          <SectionHeading eyebrow="Latest" title="Announcements" />
          <div className="mt-12 space-y-4">
            {activeAnnouncements.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <div className="card flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-gold">{a.title}</h3>
                    <p className="mt-1 text-sm text-cream/70">{a.body}</p>
                  </div>
                  {a.date && (
                    <span className="shrink-0 text-xs text-cream/50">
                      {new Date(a.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
