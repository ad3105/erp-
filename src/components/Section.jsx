import Reveal from './Reveal'

/** A consistent section heading: eyebrow, serif title, gold divider, optional subtitle. */
export default function SectionHeading({ eyebrow, title, subtitle, center = true, light = false }) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        className={`text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-night-900' : 'text-cream'
        }`}
      >
        {title}
      </h2>
      <div className={`gold-divider mt-5 ${center ? '' : 'ml-0'}`} />
      {subtitle && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            light ? 'text-night-700' : 'text-cream/70'
          } ${center ? '' : 'ml-0'}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
