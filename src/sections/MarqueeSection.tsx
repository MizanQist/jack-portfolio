import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'

// tiles reuse the project captures already shipped in public/projects — small WebPs, no third-party GIFs
const TILES = [
  'dopres-poster', 'villa-71-1', 'lantees-1', 'glamor-attire-1', 'cova-manor-1', 'heights-777-1', 'lantees-drinks-2', 'dopres-1',
  'villa-71-2', 'teapot-1', 'lantees-2', 'glamor-attire-2', 'cova-manor-2', 'heights-777-2', 'dopres-2',
].map((name) => `${import.meta.env.BASE_URL}projects/${name}.webp`)

const ROW_ONE = [...TILES.slice(0, 8), ...TILES.slice(0, 8), ...TILES.slice(0, 8)]
const ROW_TWO = [...TILES.slice(8), ...TILES.slice(8), ...TILES.slice(8)]
const SCROLL_FACTOR = 0.3
const START_SHIFT = 200

function Row({ images, x }: { images: string[]; x: MotionValue<number> }) {
  // rows are tripled; start one set (a third of own width) to the left so neither edge ever runs empty
  const transform = useMotionTemplate`translateX(calc(${x}px - 33.333%))`
  return (
    <motion.div className="flex gap-3" style={{ transform, willChange: 'transform' }}>
      {images.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          width={420}
          height={270}
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </motion.div>
  )
}

export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  // progress 0→1 while the section crosses the viewport; scaled back to the pixel distance travelled
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const offset = useTransform(scrollYProgress, (p) => {
    const el = ref.current
    const travel = el ? el.offsetHeight + window.innerHeight : 0
    return p * travel * SCROLL_FACTOR
  })
  const rightward = useTransform(offset, (o) => o - START_SHIFT)
  const leftward = useTransform(offset, (o) => -(o - START_SHIFT))

  return (
    <section ref={ref} aria-label="Selected work" className="flex flex-col gap-3 overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40">
      <Row images={ROW_ONE} x={rightward} />
      <Row images={ROW_TWO} x={leftward} />
    </section>
  )
}
