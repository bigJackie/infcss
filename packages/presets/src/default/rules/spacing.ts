import type { Rule } from '@infcss/shared'
import { directionMap } from '../themes/index.ts'

export const spacing: Rule[] = [
  // margin
  [
    /^(?:m)(t|r|b|l|x|y|a)-(\d+)(x?)$/,
    ([, direction, val, multi]) =>
      Object.fromEntries(
        directionMap[direction].map(d => [
          `margin-${d}`,
          multi ? `${parseInt(val) / 4}rem` : `${parseInt(val)}px`,
        ]),
      ),
  ],
  // padding
  [
    /^(?:p)(t|r|b|l|x|y|a)-(\d+)(x?)$/,
    ([, direction, val, multi]) =>
      Object.fromEntries(
        directionMap[direction].map(d => [
          `padding-${d}`,
          multi ? `${parseInt(val) / 4}rem` : `${parseInt(val)}px`,
        ]),
      ),
  ],
]
