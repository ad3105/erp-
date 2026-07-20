import { Link } from 'react-router-dom'
import { CrestLogo } from '../components/Logos'

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <CrestLogo className="mx-auto h-24 w-24 opacity-70" />
        <p className="mt-8 font-serif text-6xl font-semibold text-gold">404</p>
        <h1 className="mt-2 font-serif text-2xl text-cream">Page not found</h1>
        <p className="mt-3 text-cream/60">
          The page you're looking for has wandered off with the pride.
        </p>
        <Link to="/" className="btn-gold mt-8">
          Return home
        </Link>
      </div>
    </div>
  )
}
