import { ContactButton } from '../components/Buttons'
import { FadeIn } from '../components/FadeIn'
import { Magnet } from '../components/Magnet'
import portrait from '../assets/jack.webp'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Price', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn as="header" delay={0} y={-20} className="px-6 pt-6 md:px-10 md:pt-8">
        <nav aria-label="Main navigation" className="flex items-center justify-between">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm font-medium uppercase tracking-wider text-mist transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn as="h1" delay={0.15} y={40} className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[17vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[18vw] md:-mt-5">
          Hi, i&apos;m Ali
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-mist sm:max-w-[240px] md:max-w-[300px] lg:max-w-[360px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            A Software engineer with a background in Civil Engineering. I build software that solves real problems with an eye for product design and user experience
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* positioning lives on a plain div: FadeIn writes an inline transform that would clobber Tailwind's translate.
          Upright screens (phones, iPad portrait) keep the head centred between heading and footer; landscape pins it to the bottom */}
      <div className="hero-portrait absolute left-1/2 z-10">
        <FadeIn delay={0.6} y={30}>
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={portrait}
            alt="Stylised 3D portrait of Ali"
            width={1040}
            height={1554}
            // @ts-expect-error React 18 wants the lowercase DOM spelling
            fetchpriority="high"
            className="block h-auto w-full select-none"
            draggable={false}
          />
        </Magnet>
        </FadeIn>
      </div>
    </section>
  )
}
