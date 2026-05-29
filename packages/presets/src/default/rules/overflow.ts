import type { Rule } from '@infcss/shared'

export const overflow: Rule[] = [
  // overflow
  [
    /^overflow-?([xy])?-(auto|hidden|visible|scroll)$/,
    ([, direction, val]) => ({
      [direction ? `overflow-${direction}` : 'overflow']: val,
    }),
  ],

  // scroll-behavior
  [
    /^scroll-(auto|smooth)$/,
    ([, val]) => ({
      'scroll-behavior': val,
    }),
  ],
]
