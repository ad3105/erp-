import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import MemberCard from '../components/MemberCard'
import { useContent } from '../hooks/useContent'

const CATEGORY_META = {
  faculty: { label: 'Faculty Coordinators', blurb: 'The mentors who guide our journey.' },
  office_bearer: { label: 'Office Bearers · Council', blurb: 'The team leading the club this tenure.' },
  senior: { label: 'Seniors & Coordinators', blurb: 'Experienced Leos advising the council.' },
  board: { label: 'Board of Directors', blurb: 'Directors driving each function of the club.' },
  general: { label: 'General Members', blurb: 'The heart of our pride.' },
}
const ORDER = ['faculty', 'office_bearer', 'senior', 'board', 'general']

export default function Members() {
  const { members, tenures } = useContent()
  const sortedTenures = [...tenures].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
  const [tenure, setTenure] = useState(sortedTenures[0]?.id || '2026-27')

  const grouped = useMemo(() => {
    const inTenure = members
      .filter((m) => m.tenure === tenure)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    const g = {}
    for (const cat of ORDER) {
      const rows = inTenure.filter((m) => m.category === cat)
      if (rows.length) g[cat] = rows
    }
    return g
  }, [members, tenure])

  return (
    <>
      <PageHeader
        eyebrow="Our People"
        title="Members & Council"
        subtitle="Meet the Leos who make it all happen. Switch tenures to see past councils."
      >
        <div className="mt-8 inline-flex rounded-full border border-gold/30 bg-night-900/60 p-1">
          {sortedTenures.map((t) => (
            <button
              key={t.id}
              onClick={() => setTenure(t.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                tenure === t.id ? 'bg-gold-gradient text-night-900 shadow-gold' : 'text-cream/70 hover:text-gold'
              }`}
            >
              {t.label}
              {t.is_current && <span className="ml-1.5 text-[10px] uppercase">· current</span>}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className="container-x py-16 sm:py-20">
        {Object.keys(grouped).length === 0 && (
          <p className="py-20 text-center text-cream/60">No members listed for this tenure yet.</p>
        )}

        {ORDER.filter((c) => grouped[c]).map((cat) => {
          const rows = grouped[cat]
          const feature = cat === 'office_bearer' || cat === 'faculty'
          return (
            <section key={cat} className="mb-16">
              <Reveal>
                <div className="mb-8 text-center">
                  <h2 className="font-serif text-2xl font-semibold text-cream sm:text-3xl">
                    {CATEGORY_META[cat].label}
                  </h2>
                  <div className="gold-divider mt-4" />
                  <p className="mt-3 text-sm text-cream/60">{CATEGORY_META[cat].blurb}</p>
                </div>
              </Reveal>
              <div
                className={`grid gap-5 ${
                  feature
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                }`}
              >
                {rows.map((m, i) => (
                  <Reveal key={m.id} delay={(i % 5) * 70}>
                    <MemberCard member={m} featured={feature} />
                  </Reveal>
                ))}
              </div>
            </section>
          )
        })}

        {!grouped.general && (
          <Reveal className="mx-auto max-w-xl rounded-2xl border border-dashed border-gold/25 p-8 text-center">
            <p className="text-cream/70">
              The full general members list will be added here soon. Are you a Leo?{' '}
              <span className="text-gold">Add members from the admin dashboard.</span>
            </p>
          </Reveal>
        )}
      </div>
    </>
  )
}
