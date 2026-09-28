import { AnimatedText } from '../components/AnimatedText'
import { ContactButton } from '../components/Buttons'
import { FadeIn } from '../components/FadeIn'

const FIGMA_ASSETS =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7'

const DECOR = [
  {
    src: `${FIGMA_ASSETS}/moon_icon.11395d36.png`,
    className: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: `${FIGMA_ASSETS}/p59_1.4659672e.png`,
    className: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: `${FIGMA_ASSETS}/lego_icon-1.703bb594.png`,
    className: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: `${FIGMA_ASSETS}/Group_134-1.2e04f3ce.png`,
    className: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
]

const BIO =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

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
