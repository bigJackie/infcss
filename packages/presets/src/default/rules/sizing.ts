import type { Rule } from '@infcss/shared'
import { sizingMap, screenBreakPointMap } from '../themes/index.ts'

export const sizing: Rule[] = [
  // width (numeric)
  [
    /^(max-|min-)?(?:width|w)-(\d+)(x?)$/,
    ([, limit, val, multi]) => ({
      [`${limit ?? ''}width`]: multi
        ? `${parseInt(val) / 4}rem`
        : `${parseInt(val)}px`,
    }),
  ],

  // width (keyword)
  [
    /^(max-|min-)?(?:width|w)-(auto|screen|none|full)(?:-?)(\S+)?$/,
    ([, limit, val, screen]) => ({
      [`${limit ?? ''}width`]: screen
        ? val === 'screen'
          ? screenBreakPointMap[screen]
          : sizingMap[val]
        : sizingMap[val],
    }),
  ],

  // height (numeric)
  [
    /^(max-|min-)?(?:height|h)-(\d+)(x?)$/,
    ([, limit, val, multi]) => ({
      [`${limit ?? ''}height`]: multi
        ? `${parseInt(val) / 4}rem`
        : `${parseInt(val)}px`,
    }),
  ],

  // height (keyword)
  [
    /^(max-|min-)?(?:height|h)-(auto|screen|none|full)(?:-?)(\S+)?$/,
    ([, limit, val, screen]) => ({
      [`${limit ?? ''}height`]:
        val === 'screen'
          ? screen
            ? screenBreakPointMap[screen]
            : sizingMap[val]
          : sizingMap[val],
    }),
  ],

  // box-sizing
  [
    /^box-(border|content)$/,
    ([, val]) => ({
      '-webkit-box-sizing': `${val}-box`,
      'box-sizing': `${val}-box`,
    }),
  ],
]
