import type { Rule } from '@infcss/shared'

export const opacity: Rule[] = [
  // opacity
  [/^opacity-(\d+)$/, ([, val]) => ({ opacity: `${parseInt(val) / 100}` })],
]
