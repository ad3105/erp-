import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const open = index !== null && index >= 0

  const prev = useCallback(
    (e) => {
      e?.stopPropagation()
      onNavigate((index - 1 + images.length) % images.length)
    },
    [index, images, onNavigate],
  )
  const next = useCallback(
    (e) => {
      e?.stopPropagation()
      onNavigate((index + 1) % images.length)
    },
    [index, images, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, prev, next])

  const current = open ? images[index] : null

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center bg-night-950/95 p-4 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="absolute right-5 top-5 text-cream/80 hover:text-gold" aria-label="Close">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 text-cream/70 hover:text-gold sm:left-8" aria-label="Previous">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={next} className="absolute right-4 text-cream/70 hover:text-gold sm:right-8" aria-label="Next">
                <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          <motion.figure
            key={current.id}
            className="max-h-[85vh] max-w-4xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image_url}
              alt={current.title || 'Gallery image'}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            {(current.title || current.group) && (
              <figcaption className="mt-3 text-center text-sm text-cream/70">
                {current.title}
                {current.group && <span className="text-gold"> · {current.group}</span>}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
