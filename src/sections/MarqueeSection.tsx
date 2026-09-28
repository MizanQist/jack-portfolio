import { useEffect, useRef, useState } from 'react'

const GIFS = [
  'hero-space-voyage-preview-eECLH3Yc',
  'hero-codenest-preview-Cgppc2qV',
  'hero-vex-ventures-preview-BczMFIiw',
  'hero-stellar-ai-v2-preview-DjvxjG3C',
  'hero-asme-preview-B_nGDnTP',
  'hero-transform-data-preview-Cx5OU29N',
  'hero-vitara-preview-Cjz2QYyU',
  'hero-terra-preview-BFjrCr7T',
  'hero-skyelite-preview-DHaZIgUv',
  'hero-aethera-preview-DknSlcTa',
  'hero-designpro-preview-D8c5_een',
  'hero-stellar-ai-preview-D3HL6bw1',
  'hero-xportfolio-preview-D4A8maiC',
  'hero-orbit-web3-preview-BXt4OttD',
  'hero-nexora-preview-cx5HmUgo',
  'hero-evr-ventures-preview-DZxeVFEX',
  'hero-planet-orbit-preview-DWAP8Z1P',
  'hero-new-era-preview-CocuDUm9',
  'hero-wealth-preview-B70idl_u',
  'hero-luminex-preview-CxOP7ce6',
  'hero-celestia-preview-0yO3jXO8',
].map((name) => `https://motionsites.ai/assets/${name}.gif`)

const ROW_ONE = [...GIFS.slice(0, 11), ...GIFS.slice(0, 11), ...GIFS.slice(0, 11)]
const ROW_TWO = [...GIFS.slice(11), ...GIFS.slice(11), ...GIFS.slice(11)]
const SCROLL_FACTOR = 0.3
const START_SHIFT = 200

function Row({ images, x }: { images: string[]; x: number }) {
  return (
    // rows are tripled; start one set (a third of own width) to the left so neither edge ever runs empty
    <div
      className="flex gap-3"
      style={{ transform: `translateX(calc(${x}px - 33.333%))`, willChange: 'transform' }}
    >
      {images.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          loading="lazy"
          width={420}
          height={270}
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  )
}

export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const sectionTop = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - sectionTop + window.innerHeight) * SCROLL_FACTOR)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} aria-label="Selected motion work" className="flex flex-col gap-3 overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40">
      <Row images={ROW_ONE} x={offset - START_SHIFT} />
      <Row images={ROW_TWO} x={-(offset - START_SHIFT)} />
    </section>
  )
}
