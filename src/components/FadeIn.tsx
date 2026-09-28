import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { ElementType, ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  duration?: number
  x?: number
  y?: number
}

const EASE = [0.25, 0.1, 0.25, 1] as const

export function FadeIn({
  children,
  as = 'div',
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
}: FadeInProps) {
  // memoised so the element type is stable across renders (otherwise React remounts children)
  const Component = useMemo(() => motion.create(as), [as])
  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </Component>
  )
}
