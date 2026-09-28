import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import { LiveProjectButton } from '../components/Buttons'
import { FadeIn } from '../components/FadeIn'

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P'
const img = (file: string) =>
  `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(`${CDN}/${file}.png`)}&w=1280&q=85`

const PROJECTS = [
  {
    name: 'Nextlevel Studio',
    category: 'Client',
    images: [
      img('hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db'),
      img('hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8'),
      img('hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327'),
    ],
  },
  {
    name: 'Aura Brand Identity',
    category: 'Personal',
    images: [
      img('hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f'),
      img('hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1'),
      img('hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea'),
    ],
  },
  {
    name: 'Solaris Digital',
    category: 'Client',
    images: [
      img('hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f'),
      img('hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b'),
      img('hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee'),
    ],
  },
]

const SCALE_STEP = 0.03
const STACK_OFFSET_PX = 28
const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

type CardProps = {
  project: (typeof PROJECTS)[number]
  index: number
  total: number
  progress: MotionValue<number>
}

function ProjectCard({ project, index, total, progress }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * SCALE_STEP
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const [left1, left2, right] = project.images

  return (
    <div className="h-[85vh]">
      <motion.article
        style={{ scale, top: `calc(var(--stack-top) + ${index * STACK_OFFSET_PX}px)` }}
        className={`sticky flex flex-col gap-6 border-2 border-mist bg-ink p-4 [--stack-top:6rem] sm:gap-8 sm:p-6 md:gap-10 md:p-8 md:[--stack-top:8rem] ${RADIUS}`}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10">
          <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-mist">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-xs font-light uppercase tracking-widest text-mist/60 sm:text-sm">{project.category}</span>
            <h3 className="text-[clamp(1.25rem,2.6vw,2.5rem)] font-medium uppercase leading-tight text-mist">
              {project.name}
            </h3>
          </div>
          <div className="w-full sm:w-auto">
            <LiveProjectButton />
          </div>
        </div>

        <div className="grid grid-cols-[40fr_60fr] gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <img src={left1} alt="" loading="lazy" className={`w-full object-cover ${RADIUS}`} style={{ height: 'clamp(130px, 16vw, 230px)' }} />
            <img src={left2} alt="" loading="lazy" className={`w-full object-cover ${RADIUS}`} style={{ height: 'clamp(160px, 22vw, 340px)' }} />
          </div>
          <img src={right} alt="" loading="lazy" className={`h-full w-full object-cover ${RADIUS}`} />
        </div>
      </motion.article>
    </div>
  )
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn
        as="h2"
        y={40}
        className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
      >
        Project
      </FadeIn>

      <div ref={ref} className="mx-auto max-w-6xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
