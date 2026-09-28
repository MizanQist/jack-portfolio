import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
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
  { slug: 'villa-71', name: 'Villa 71', category: 'Brochure site', href: 'https://mizanqist.github.io/villa-71/' },
  { slug: 'lantees', name: 'Lantees Cafe', category: 'Website', href: 'https://mizanqist.github.io/lantees-cafe/' },
  { slug: 'cova-manor', name: 'Cova Manor', category: 'Brochure site', href: 'https://mizanqist.github.io/cova-manor/' },
  { slug: 'glamor-attire', name: 'Glamor Attire', category: 'Website', href: 'https://mizanqist.github.io/glamor-attire/' },
  { slug: 'heights-777', name: 'Heights 777', category: 'Brochure site', href: 'https://mizanqist.github.io/heights-777/' },
  { slug: 'lantees-drinks', name: 'Lantees Drinks', category: 'Motion', video: 'portrait' },
  { slug: 'teapot', name: 'Teapot', category: 'Motion', video: 'portrait' },
  { slug: 'dopres', name: 'Dopres', category: 'Motion', video: 'wide' },
]

const asset = (file: string) => `${import.meta.env.BASE_URL}projects/${file}`

const SCALE_STEP = 0.03
const STACK_OFFSET_PX = 28
const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

function Clip({ slug, className }: { slug: string; className?: string }) {
  return (
    <video
      src={asset(`${slug}.mp4`)}
      poster={asset(`${slug}-poster.webp`)}
      className={`${className ?? ''} object-cover ${RADIUS}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}

function Media({ project }: { project: Project }) {
  if (project.video === 'wide') return <Clip slug={project.slug} className="aspect-video w-full" />

  return (
    <div className="grid grid-cols-[40fr_60fr] gap-4 sm:gap-6 md:gap-8">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        <img src={asset(`${project.slug}-1.webp`)} alt="" loading="lazy" className={`w-full object-cover ${RADIUS}`} style={{ height: 'clamp(130px, 16vw, 230px)' }} />
        <img src={asset(`${project.slug}-2.webp`)} alt="" loading="lazy" className={`w-full object-cover ${RADIUS}`} style={{ height: 'clamp(160px, 22vw, 340px)' }} />
      </div>
      {project.video === 'portrait' ? (
        <Clip slug={project.slug} className="h-full w-full" />
      ) : (
        <img src={asset(`${project.slug}-3.webp`)} alt="" loading="lazy" className={`h-full w-full object-cover ${RADIUS}`} />
      )}
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

      <div ref={ref} className="mx-auto max-w-6xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
