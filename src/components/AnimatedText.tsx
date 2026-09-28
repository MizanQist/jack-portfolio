import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { MotionValue } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  className?: string
}

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const words = text.split(' ')
  const total = text.length
  let cursor = 0

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        const start = cursor
        cursor += word.length + 1
        // the space must be a sibling text node: trailing whitespace inside an inline-block collapses
        return (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((char, ci) => (
                <Char
                  key={ci}
                  char={char}
                  range={[(start + ci) / total, (start + ci + 1) / total]}
                  progress={scrollYProgress}
                />
              ))}
            </span>
            {wi < words.length - 1 && ' '}
          </span>
        )
      })}
    </p>
  )
}

type CharProps = {
  char: string
  range: [number, number]
  progress: MotionValue<number>
}

function Char({ char, range, progress }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span aria-hidden className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}
