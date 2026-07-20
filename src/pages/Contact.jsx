import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { CLUB } from '../data/seed'

function Row({ icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-cream/50">{label}</p>
        <div className="mt-0.5 text-cream/85">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Website enquiry — ${form.name || 'Visitor'}`)
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)
    window.location.href = `mailto:${CLUB.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Get in Touch"
        subtitle="Questions, collaborations, or want to support our work? We'd love to hear from you."
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal className="space-y-7">
            <Row
              label="Email"
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              }
            >
              <a href={`mailto:${CLUB.email}`} className="hover:text-gold">{CLUB.email}</a>
            </Row>
            <Row
              label="Instagram"
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              }
            >
              <a href={CLUB.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">{CLUB.instagramHandle}</a>
            </Row>
            <Row
              label="LinkedIn"
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.56-2.3 3.2V21H9z" /></svg>
              }
            >
              {CLUB.linkedin ? (
                <a href={CLUB.linkedin} target="_blank" rel="noreferrer" className="hover:text-gold">Leo Club of REC</a>
              ) : (
                <span className="text-cream/50">Coming soon</span>
              )}
            </Row>
            <Row
              label="Find us"
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
              }
            >
              {CLUB.college}
              <br />
              {CLUB.location}
            </Row>

            <div className="overflow-hidden rounded-2xl border border-gold/20">
              <iframe
                title="Rajalakshmi Engineering College map"
                src="https://www.google.com/maps?q=Rajalakshmi+Engineering+College+Chennai&output=embed"
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-7 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold text-cream">Send a message</h3>
              {sent ? (
                <div className="mt-6 rounded-xl border border-gold/30 bg-gold/5 p-6 text-center">
                  <p className="font-serif text-lg text-gold">Message ready to send 🦁</p>
                  <p className="mt-2 text-sm text-cream/70">
                    Your email app should have opened. If not, write to{' '}
                    <a href={`mailto:${CLUB.email}`} className="text-gold">{CLUB.email}</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div>
                    <label className="label">Name</label>
                    <input className="input" required value={form.name} onChange={upd('name')} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input className="input" type="email" required value={form.email} onChange={upd('email')} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="label">Message</label>
                    <textarea className="input min-h-[140px]" required value={form.message} onChange={upd('message')} placeholder="How can we help?" />
                  </div>
                  <button type="submit" className="btn-gold w-full">Send message</button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
