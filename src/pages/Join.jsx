import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { CLUB } from '../data/seed'

const STEPS = [
  { n: '01', t: 'Be a REC student', d: 'Any student of Rajalakshmi Engineering College can join the pride.' },
  { n: '02', t: 'Watch for recruitment', d: 'We run council and board recruitment drives each tenure — announced on Instagram.' },
  { n: '03', t: 'Apply & interview', d: 'Fill the recruitment form and meet the team. We look for passion, not experience.' },
  { n: '04', t: 'Serve & grow', d: 'Join projects, take the lead, and become part of a movement that gives back.' },
]

const DOES = [
  'Plan and run community service projects',
  'Visit orphanages, old age homes and schools',
  'Organise donation & food drives (like SHRESTHA)',
  'Build leadership, teamwork & event-management skills',
  'Collaborate with Lions Clubs and other student clubs',
  'Make lifelong friends across the pride',
]

export default function Join() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', dept: '', year: '', email: '', why: '' })

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Leo Club Recruitment — ${form.name || 'New applicant'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nDepartment: ${form.dept}\nYear: ${form.year}\nEmail: ${form.email}\n\nWhy I want to join:\n${form.why}`,
    )
    window.location.href = `mailto:${CLUB.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <PageHeader
        eyebrow="Become a Leo"
        title="Join the Pride"
        subtitle="Leadership, Experience, Opportunity — and a community that serves together."
      />

      {/* How it works */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="card card-hover h-full p-6">
                <span className="font-serif text-3xl font-semibold text-gold/40">{s.n}</span>
                <h3 className="mt-3 font-serif text-lg font-semibold text-cream">{s.t}</h3>
                <p className="mt-2 text-sm text-cream/65">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What members do + form */}
      <section className="container-x pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="eyebrow mb-3">What our members do</p>
            <h2 className="font-serif text-3xl font-semibold text-cream">More than a club</h2>
            <div className="gold-divider ml-0 mt-5" />
            <ul className="mt-7 space-y-3">
              {DOES.map((d) => (
                <li key={d} className="flex items-start gap-3 text-cream/75">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4 10-10" />
                  </svg>
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-gold/20 bg-night-900/50 p-5">
              <p className="text-sm text-cream/70">
                Recruitment not open right now? Follow us on{' '}
                <a href={CLUB.instagram} target="_blank" rel="noreferrer" className="text-gold underline-offset-2 hover:underline">
                  {CLUB.instagramHandle}
                </a>{' '}
                — we announce every council and board drive there.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-7 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold text-cream">Recruitment interest form</h3>
              <p className="mt-2 text-sm text-cream/60">
                Tell us about yourself and we'll reach out when the next drive opens.
              </p>

              {sent ? (
                <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-6 text-center">
                  <p className="font-serif text-lg text-gold">Thank you! 🦁</p>
                  <p className="mt-2 text-sm text-cream/70">
                    Your email app should have opened with your details. If not, write to us at{' '}
                    <a href={`mailto:${CLUB.email}`} className="text-gold">{CLUB.email}</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label">Full name</label>
                      <input className="input" required value={form.name} onChange={upd('name')} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input className="input" type="email" required value={form.email} onChange={upd('email')} placeholder="you@rajalakshmi.edu.in" />
                    </div>
                    <div>
                      <label className="label">Department</label>
                      <input className="input" value={form.dept} onChange={upd('dept')} placeholder="e.g. CSE" />
                    </div>
                    <div>
                      <label className="label">Year</label>
                      <input className="input" value={form.year} onChange={upd('year')} placeholder="e.g. II Year" />
                    </div>
                  </div>
                  <div>
                    <label className="label">Why do you want to join?</label>
                    <textarea className="input min-h-[110px]" value={form.why} onChange={upd('why')} placeholder="Tell us what service means to you…" />
                  </div>
                  <button type="submit" className="btn-gold w-full">
                    Submit interest
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
