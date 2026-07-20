import { Link } from 'react-router-dom'
import { CrestLogo, LionsLogo, CollegeLogo } from './Logos'
import { CLUB } from '../data/seed'

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.56-2.3 3.2V21H9z" />
    </svg>
  )
}
function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold/20 bg-night-950">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <CrestLogo className="h-14 w-14" />
            <div>
              <p className="font-serif text-xl font-semibold text-cream">Leo Club of REC</p>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{CLUB.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">
            A club of {CLUB.college}, chartered under {CLUB.parent}, {CLUB.district}. We inspire and
            empower to make a difference.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={CLUB.instagram}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={CLUB.linkedin || '#'}
              target="_blank"
              rel="noreferrer"
              className={`grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10 ${
                CLUB.linkedin ? '' : 'opacity-50'
              }`}
              aria-label="LinkedIn (coming soon)"
              title={CLUB.linkedin ? 'LinkedIn' : 'LinkedIn — coming soon'}
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${CLUB.email}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10"
              aria-label="Email"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/65">
            {[
              ['About', '/about'],
              ['Members', '/members'],
              ['Events', '/events'],
              ['Gallery', '/gallery'],
              ['Achievements', '/achievements'],
              ['Join Us', '/join'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="md:col-span-4">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gold">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-cream/65">
            <li>
              <a href={`mailto:${CLUB.email}`} className="transition hover:text-gold">
                {CLUB.email}
              </a>
            </li>
            <li>
              <a href={CLUB.instagram} target="_blank" rel="noreferrer" className="transition hover:text-gold">
                {CLUB.instagramHandle}
              </a>
            </li>
            <li className="leading-relaxed">
              {CLUB.college},<br />
              {CLUB.location}
            </li>
          </ul>
        </div>
      </div>

      {/* Affiliations strip — college given prominence */}
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center gap-6 py-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1.5">
              <CollegeLogo className="h-12 w-12" />
              <span className="text-[10px] uppercase tracking-wider text-cream/50">College</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <CrestLogo className="h-12 w-12" />
              <span className="text-[10px] uppercase tracking-wider text-cream/50">Leo Club</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <LionsLogo className="h-12 w-12" />
              <span className="text-[10px] uppercase tracking-wider text-cream/50">Lions Intl</span>
            </div>
          </div>
          <p className="text-center text-xs text-cream/45 sm:text-right">
            © {new Date().getFullYear()} Leo Club of Rajalakshmi Engineering College.
            <br className="sm:hidden" /> A club of {CLUB.college} · {CLUB.district}.
          </p>
        </div>
      </div>
    </footer>
  )
}
