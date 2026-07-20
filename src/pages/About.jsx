import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/Section'
import { CrestLogo, LionsLogo, CollegeLogo } from '../components/Logos'
import { CLUB } from '../data/seed'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="About the Leo Club of REC"
        subtitle="Leadership. Experience. Opportunity. A student movement of service under Lions Clubs International."
      />

      {/* Story + mission */}
      <section className="container-x py-20">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <p className="eyebrow mb-3">Our Mission</p>
            <h2 className="font-serif text-3xl font-semibold text-cream">
              To inspire and empower students to make a difference
            </h2>
            <div className="gold-divider ml-0 mt-5" />
            <p className="mt-6 leading-relaxed text-cream/75">
              The Leo Club of Rajalakshmi Engineering College brings together students who believe
              that service is the truest form of leadership. We identify real needs across
              Chennai — in orphanages, old age homes, schools, temples and streets — and act on
              them, together, as a pride.
            </p>
            <p className="mt-4 leading-relaxed text-cream/75">
              Through every project, our members grow into confident organisers, empathetic leaders
              and lifelong volunteers. We don't just conduct events; we build character and
              community.
            </p>
            <blockquote className="mt-6 space-y-1 border-l-2 border-gold/50 pl-4">
              {CLUB.mottos.map((m) => (
                <p key={m} className="italic text-gold/90">
                  “{m}.”
                </p>
              ))}
            </blockquote>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow mb-3">What Leo Clubs Do</p>
            <h2 className="font-serif text-3xl font-semibold text-cream">Youth of Lions</h2>
            <div className="gold-divider ml-0 mt-5" />
            <p className="mt-6 leading-relaxed text-cream/75">
              Leo Clubs are the youth wing of Lions Clubs International — one of the world's largest
              service organisations. <strong className="text-gold">LEO</strong> stands for{' '}
              <em>Leadership, Experience and Opportunity</em>. Around the world, Leos plan and run
              community service projects, develop leadership skills, and work alongside their
              sponsoring Lions Club.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Serve local communities through hands-on projects',
                'Develop leadership, teamwork and organisational skills',
                'Raise awareness on health, education and social causes',
                'Collaborate with Lions Clubs and other student bodies',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-cream/75">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4 10-10" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Affiliations */}
      <section className="border-y border-gold/15 bg-night-900/40 py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Affiliations"
            title="Rooted in a global movement, grounded on our campus"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                Logo: CollegeLogo,
                title: 'Rajalakshmi Engineering College',
                text: 'Our home. The Leo Club of REC is a club of Rajalakshmi Engineering College, Chennai, supported by our faculty coordinators and college leadership.',
              },
              {
                Logo: LionsLogo,
                title: 'Lions Clubs International · 324 M',
                text: 'We are chartered under Lions Clubs International, District 324 M — connecting our campus service to a worldwide network of Lions and Leos.',
              },
              {
                Logo: CrestLogo,
                title: 'A Pride of Leos',
                text: 'Our crest carries two lions, “324 M” and our promise — “We\'re better together.” It represents the strength we find in serving as one.',
              },
            ].map(({ Logo, title, text }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="card card-hover h-full p-7 text-center">
                  <Logo className="mx-auto h-16 w-16" />
                  <h3 className="mt-5 font-serif text-xl font-semibold text-cream">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership message + faculty — placeholders */}
      <section className="container-x py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <p className="eyebrow mb-3">A message from the leadership</p>
              <h3 className="font-serif text-2xl font-semibold text-cream">
                From the President's desk
              </h3>
              <div className="gold-divider ml-0 mt-4" />
              <p className="mt-6 italic leading-relaxed text-cream/70">
                “This space is reserved for a message from our club leadership — sharing the vision
                for the year, gratitude to our volunteers, and an invitation to every student to
                join the pride. (Add your message from the admin dashboard.)”
              </p>
              <p className="mt-6 text-sm font-medium text-gold">— President, Leo Club of REC</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card h-full p-8">
              <p className="eyebrow mb-3">Guided by our faculty</p>
              <h3 className="font-serif text-2xl font-semibold text-cream">Faculty Coordinators</h3>
              <div className="gold-divider ml-0 mt-4" />
              <p className="mt-6 leading-relaxed text-cream/70">
                Our club is mentored by dedicated faculty coordinators from Rajalakshmi Engineering
                College who guide our projects and support our members.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {['D Gururaj', 'Sushma Jagatap'].map((name) => (
                  <div key={name} className="rounded-xl border border-gold/20 bg-night-900/50 p-4 text-center">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 font-serif text-lg text-gold">
                      {name.split(' ').map((w) => w[0]).join('')}
                    </div>
                    <p className="mt-3 font-medium text-cream">{name}</p>
                    <p className="text-xs text-gold">Faculty Coordinator</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
