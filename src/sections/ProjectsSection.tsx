import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import type { MotionValue } from 'framer-motion'
import { LiveProjectButton } from '../components/Buttons'
import { FadeIn } from '../components/FadeIn'

type Project = {
  slug: string
  name: string
  category: string
  href?: string
  // portrait videos take the tall right column; wide ones span the whole media row
  video?: 'portrait' | 'wide'
}

// assets live in public/projects as <slug>-1/-2/-3.webp, or <slug>.mp4 + <slug>-poster.webp for videos
const PROJECTS: Project[] = [
  { slug: 'dopres', name: 'Dopres', category: 'Motion', video: 'wide' },
  { slug: 'lantees-drinks', name: 'Lantees Drinks', category: 'Motion', video: 'portrait' },
  { slug: 'lantees', name: 'Lantees Cafe', category: 'Website', href: 'https://mizanqist.github.io/lantees-cafe/' },
  { slug: 'glamor-attire', name: 'Glamor Attire', category: 'Website', href: 'https://mizanqist.github.io/glamor-attire/' },
  { slug: 'teapot', name: 'Teapot', category: 'Motion', video: 'portrait' },
  { slug: 'cova-manor', name: 'Cova Manor', category: 'Brochure site', href: 'https://mizanqist.github.io/cova-manor/' },
  { slug: 'villa-71', name: 'Villa 71', category: 'Brochure site', href: 'https://mizanqist.github.io/villa-71/' },
  { slug: 'heights-777', name: 'Heights 777', category: 'Brochure site', href: 'https://mizanqist.github.io/heights-777/' },
]

const asset = (file: string) => `${import.meta.env.BASE_URL}projects/${file}`

const SCALE_STEP = 0.03
// eight cards stack, so keep the per-card peek small or the last card is pushed off-screen
const STACK_OFFSET_PX = 12
const STACK_TOP = '6rem'
// media heights are capped by viewport height too, so a whole card fits under the sticky top on desktop
const LEFT_TOP_H = 'clamp(130px, min(16vw, 17vh), 230px)'
const LEFT_BOTTOM_H = 'clamp(160px, min(22vw, 25vh), 340px)'
const WIDE_H = 'clamp(200px, min(56vw, 46vh), 620px)'
const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

function Clip({ slug, className, style }: { slug: string; className?: string; style?: CSSProperties }) {
  return (
    <video
      src={asset(`${slug}.mp4`)}
      poster={asset(`${slug}-poster.webp`)}
      className={`${className ?? ''} object-cover ${RADIUS}`}
      style={style}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}

function Media({ project }: { project: Project }) {
  if (project.video === 'wide') return <Clip slug={project.slug} className="w-full" style={{ height: WIDE_H }} />

  return (
    <div className="grid grid-cols-[40fr_60fr] gap-4 sm:gap-6 md:gap-8">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        <img src={asset(`${project.slug}-1.webp`)} alt="" loading="lazy" className={`w-full object-cover ${RADIUS}`} style={{ height: LEFT_TOP_H }} />
        <img src={asset(`${project.slug}-2.webp`)} alt="" loading="lazy" className={`w-full object-cover ${RADIUS}`} style={{ height: LEFT_BOTTOM_H }} />
      </div>
      {/* absolutely positioned so the media's intrinsic height can't stretch the row — the left column sets it */}
      <div className="relative">
        {project.video === 'portrait' ? (
          <Clip slug={project.slug} className="absolute inset-0 h-full w-full" />
        ) : (
          <img src={asset(`${project.slug}-3.webp`)} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${RADIUS}`} />
        )}
      </div>
    </div>
  )
}

type CardProps = {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
}

function ProjectCard({ project, index, total, progress }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * SCALE_STEP
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])

  // the full-height wrapper is the sticky element: pinned inside the shared parent it stays put while
  // the next wrapper slides over it. Sticky on the card itself gets pushed away by its own wrapper's end.
  return (
    <div className="sticky top-0 h-screen" style={{ paddingTop: `calc(${STACK_TOP} + ${index * STACK_OFFSET_PX}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className={`flex flex-col gap-6 border-2 border-mist bg-ink p-4 sm:gap-8 sm:p-6 md:gap-10 md:p-8 ${RADIUS}`}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10">
          <span className="text-[clamp(3rem,min(10vw,14vh),140px)] font-black leading-none text-mist">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-xs font-light uppercase tracking-widest text-mist/60 sm:text-sm">{project.category}</span>
            <h3 className="text-[clamp(1.25rem,2.6vw,2.5rem)] font-medium uppercase leading-tight text-mist">
              {project.name}
            </h3>
          </div>
          {project.href && (
            <div className="w-full sm:w-auto">
              <LiveProjectButton href={project.href} />
            </div>
          )}
        </div>

        <Media project={project} />
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

      {/* bottom padding lets the last card stay pinned for a while instead of leaving the moment it lands */}
      <div ref={ref} className="mx-auto max-w-6xl pb-[50vh]">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
