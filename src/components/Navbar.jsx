import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CrestLogo, CollegeLogo } from './Logos'
import { useAuth } from '../context/AuthContext'
import { CLUB } from '../data/seed'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/members', label: 'Members' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/join', label: 'Join Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-white/10 bg-night-950/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Leo Club of REC home">
          <CrestLogo className="h-11 w-11 shrink-0" />
          <div className="leading-tight">
            <p className="font-serif text-base font-semibold text-cream sm:text-lg">
              Leo Club of REC
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.25em] text-gold sm:block">
              {CLUB.tagline}
            </p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 xl:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-gold' : 'text-cream/75 hover:text-gold'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <CollegeLogo className="mx-2 h-8 w-8" />
          <Link to={isAdmin ? '/admin' : '/login'} className="btn-outline ml-1 !px-5 !py-2">
            {isAdmin ? 'Dashboard' : 'Admin'}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-cream xl:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/10 transition-all duration-500 xl:hidden ${
          open ? 'max-h-[32rem]' : 'max-h-0'
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-gold/10 text-gold' : 'text-cream/80'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to={isAdmin ? '/admin' : '/login'} className="btn-gold mt-2">
            {isAdmin ? 'Admin Dashboard' : 'Admin Login'}
          </Link>
        </div>
      </div>
    </header>
  )
}
