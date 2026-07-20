/**
 * Logo components. Each renders a tasteful on-brand SVG placeholder by
 * default. To use the REAL supplied artwork, drop the files into /public
 * (e.g. /public/logo-crest.png) and pass `src="/logo-crest.png"`, or set
 * the constants below. Nothing else needs to change.
 */

const REAL = {
  crest: null, // e.g. '/logo-crest.png'  — Leo Club of REC shield
  lions: null, // e.g. '/logo-lions.png'  — Lions International emblem
  college: null, // e.g. '/logo-rec.png'  — REC torch logo
}

function Frame({ src, alt, children, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`object-contain ${className}`}
        loading="lazy"
      />
    )
  }
  return (
    <div className={`grid place-items-center ${className}`} role="img" aria-label={alt}>
      {children}
    </div>
  )
}

/** Leo Club of REC crest — dark shield, two lions, 324 M, tagline. */
export function CrestLogo({ className = 'h-14 w-14', src = REAL.crest }) {
  return (
    <Frame src={src} alt="Leo Club of REC crest" className={className}>
      <svg viewBox="0 0 100 110" className="h-full w-full drop-shadow" aria-hidden="true">
        <defs>
          <linearGradient id="crestGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E7CE6B" />
            <stop offset="0.5" stopColor="#C9A227" />
            <stop offset="1" stopColor="#8A6D14" />
          </linearGradient>
        </defs>
        <path
          d="M50 4 L92 16 V54 C92 82 72 98 50 106 C28 98 8 82 8 54 V16 Z"
          fill="#0A1128"
          stroke="url(#crestGold)"
          strokeWidth="3"
        />
        <path
          d="M50 12 L85 22 V54 C85 78 68 91 50 98 C32 91 15 78 15 54 V22 Z"
          fill="none"
          stroke="url(#crestGold)"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Two facing lion silhouettes (stylised) */}
        <g fill="url(#crestGold)">
          <path d="M38 46 c-4 0 -7 3 -7 7 c0 4 2 6 4 8 l-2 6 h4 l2 -5 c1 0 2 0 3 0 v5 h4 v-9 c2 -2 3 -4 3 -7 c0 -5 -4 -8 -8 -8 c1 -2 0 -4 -2 -4 c0 2 -1 3 -2 3 z" />
          <path d="M62 46 c4 0 7 3 7 7 c0 4 -2 6 -4 8 l2 6 h-4 l-2 -5 c-1 0 -2 0 -3 0 v5 h-4 v-9 c-2 -2 -3 -4 -3 -7 c0 -5 4 -8 8 -8 c-1 -2 0 -4 2 -4 c0 2 1 3 2 3 z" />
        </g>
        <text x="50" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="url(#crestGold)" fontFamily="serif">324 M</text>
        <text x="50" y="92" textAnchor="middle" fontSize="5.5" fill="#F5F1E6" fontFamily="serif" letterSpacing="0.5">better together</text>
      </svg>
    </Frame>
  )
}

/** Lions Clubs International emblem placeholder. */
export function LionsLogo({ className = 'h-12 w-12', src = REAL.lions }) {
  return (
    <Frame src={src} alt="Lions Clubs International" className={className}>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="#0A1128" stroke="#C9A227" strokeWidth="3" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#C9A227" strokeWidth="2" />
        <text x="50" y="46" textAnchor="middle" fontSize="16" fontWeight="700" fill="#C9A227" fontFamily="serif">L</text>
        <text x="50" y="70" textAnchor="middle" fontSize="7" fill="#F5F1E6" fontFamily="serif" letterSpacing="1">LIONS</text>
        <path d="M12 50 h12 M76 50 h12" stroke="#C9A227" strokeWidth="2" />
      </svg>
    </Frame>
  )
}

/** Rajalakshmi Engineering College torch logo placeholder. */
export function CollegeLogo({ className = 'h-12 w-12', src = REAL.college }) {
  return (
    <Frame src={src} alt="Rajalakshmi Engineering College" className={className}>
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E7CE6B" />
            <stop offset="1" stopColor="#C9A227" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="#0A1128" stroke="#C9A227" strokeWidth="3" />
        {/* torch flame */}
        <path d="M50 20 c8 8 10 16 4 24 c3 -1 5 -4 6 -7 c4 8 -1 18 -10 18 c-9 0 -14 -10 -10 -18 c1 3 3 6 6 7 c-6 -8 -4 -16 4 -24 z" fill="url(#flame)" />
        {/* torch handle */}
        <rect x="47" y="58" width="6" height="20" rx="2" fill="#C9A227" />
        <text x="50" y="90" textAnchor="middle" fontSize="9" fontWeight="700" fill="#C9A227" fontFamily="serif">REC</text>
      </svg>
    </Frame>
  )
}
