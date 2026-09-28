import { AnimatedText } from '../components/AnimatedText'
import { ContactButton } from '../components/Buttons'
import { FadeIn } from '../components/FadeIn'
import blob from '../assets/blob.webp'
import group from '../assets/group.webp'
import lego from '../assets/lego.webp'
import moon from '../assets/moon.webp'

const DECOR = [
  {
    src: moon,
    className: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: blob,
    className: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: lego,
    className: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: group,
    className: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
]

const BIO =
  'I design and build apps, websites, and brands from concept to launch. Graphic design, product strategy, and go-to-market included.'

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10"
    >
      {DECOR.map(({ src, className, delay, x }) => (
        <div key={src} className={`pointer-events-none absolute ${className}`}>
          <FadeIn delay={delay} x={x} y={0} duration={0.9}>
            <img src={src} alt="" loading="lazy" className="block h-auto w-full" />
          </FadeIn>
        </div>
      ))}

      <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight"
          >
            About me
          </FadeIn>
          <AnimatedText
            text={BIO}
            className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-mist"
          />
        </div>
        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
