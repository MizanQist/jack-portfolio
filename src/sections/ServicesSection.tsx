import { FadeIn } from '../components/FadeIn'

const SERVICES = [
  {
    name: 'Software & Web Development',
    description:
      'End-to-end software and web development — from architecture and clean, maintainable code to fast, responsive interfaces that ship and scale.',
  },
  {
    name: '3D Modelling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    name: 'Branding',
    description:
      'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
  },
  {
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
      >
        Services
      </FadeIn>

      <ol className="mx-auto max-w-5xl">
        {SERVICES.map(({ name, description }, i) => (
          <FadeIn
            as="li"
            key={name}
            delay={i * 0.1}
            className="flex items-start gap-6 border-t border-ink/15 py-8 first:border-t-0 sm:gap-10 sm:py-10 md:gap-14 md:py-12"
          >
            <span className="w-[1.2em] shrink-0 text-[clamp(3rem,10vw,140px)] font-black leading-none">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-3 pt-2 sm:gap-4 sm:pt-3 md:pt-4">
              <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-tight">{name}</h3>
              <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                {description}
              </p>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  )
}
