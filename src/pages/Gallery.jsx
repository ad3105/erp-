import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Lightbox from '../components/Lightbox'
import { useContent } from '../hooks/useContent'
import { placeholderGradient } from '../lib/utils'

export default function Gallery() {
  const { gallery, events } = useContent()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Group images by their `group` field (event/year); flat list drives the lightbox.
  const { groups, flat } = useMemo(() => {
    const g = {}
    for (const img of gallery) {
      const key = img.group || img.year || 'Gallery'
      ;(g[key] ||= []).push(img)
    }
    const order = Object.keys(g).sort()
    const flatList = order.flatMap((k) => g[k])
    return { groups: order.map((k) => ({ key: k, items: g[k] })), flat: flatList }
  }, [gallery])

  const openAt = (img) => {
    const idx = flat.findIndex((x) => x.id === img.id)
    setLightboxIndex(idx)
  }

  return (
    <>
      <PageHeader
        eyebrow="Moments"
        title="Gallery"
        subtitle="Smiles, service and celebrations — grouped by event. Tap any photo to view it full size."
      />

      <div className="container-x py-16 sm:py-20">
        {flat.length === 0 ? (
          // Elegant empty state that still previews the structure
          <div>
            <Reveal className="mx-auto mb-12 max-w-xl rounded-2xl border border-dashed border-gold/25 p-8 text-center">
              <p className="text-cream/70">
                No photos uploaded yet. Once an admin adds images from the dashboard, they'll appear
                here grouped by event — with a full-screen lightbox.
              </p>
            </Reveal>
            <p className="mb-6 text-center text-sm uppercase tracking-widest text-gold">
              Events awaiting photos
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {events.slice(0, 12).map((e, i) => (
                <Reveal key={e.id} delay={(i % 4) * 60}>
                  <div className="aspect-square overflow-hidden rounded-xl border border-white/5">
                    <div className="grid h-full w-full place-items-center p-3 text-center" style={{ background: placeholderGradient(e.slug || e.name) }}>
                      <span className="font-serif text-sm text-gold/60">{e.name}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          groups.map((group) => (
            <section key={group.key} className="mb-14">
              <Reveal>
                <h2 className="mb-6 flex items-center gap-3 font-serif text-2xl font-semibold text-cream">
                  <span className="h-px w-8 bg-gold" />
                  {group.key}
                  <span className="text-sm font-normal text-cream/50">({group.items.length})</span>
                </h2>
              </Reveal>
              <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
                {group.items.map((img, i) => (
                  <Reveal key={img.id} delay={(i % 4) * 60}>
                    <button
                      onClick={() => openAt(img)}
                      className="group block w-full overflow-hidden rounded-xl border border-white/5"
                    >
                      <img
                        src={img.image_url}
                        alt={img.title || group.key}
                        loading="lazy"
                        className="w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </button>
                  </Reveal>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <Lightbox
        images={flat}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
