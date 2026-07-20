import { motion } from 'framer-motion'
import { initials, placeholderGradient } from '../lib/utils'

export default function MemberCard({ member, featured = false }) {
  return (
    <motion.div
      className="card card-hover group overflow-hidden text-center"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="relative aspect-square overflow-hidden">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="grid h-full w-full place-items-center"
            style={{ background: placeholderGradient(member.name) }}
          >
            <span className="grid h-20 w-20 place-items-center rounded-full border border-gold/40 font-serif text-2xl font-semibold text-gold">
              {initials(member.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className={`p-4 ${featured ? 'sm:p-5' : ''}`}>
        <h4 className={`font-serif font-semibold text-cream ${featured ? 'text-lg' : 'text-base'}`}>
          {member.name}
        </h4>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gold">{member.role}</p>
      </div>
    </motion.div>
  )
}
