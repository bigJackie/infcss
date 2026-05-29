import type { Rule } from '@infcss/shared'
import { colors } from '../themes/index.ts'

const fontWeightMap: Record<string, string> = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}

export const font: Rule[] = [
  // font-size
  [
    /^(?:text|t)-(\d+)(x?)$/,
    ([, val, multi]) => ({
      'font-size': multi ? `${parseInt(val) / 4}rem` : `${parseInt(val)}px`,
    }),
  ],

  // font-style
  [
    /^(italic|not-italic)$/,
    ([, val]) => ({
      'font-style': val === 'not-italic' ? 'normal' : 'italic',
    }),
  ],

  // font-weight (keyword)
  [
    /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    ([, val]) => ({
      'font-weight': fontWeightMap[val],
    }),
  ],

  // font-weight (number)
  [
    /^font-(\d+)$/,
    ([, val]) => ({
      'font-weight': val,
    }),
  ],

  // letter-spacing
  [
    /^(?:text|t|letter)-(?:spacing)-(\d+)$/,
    ([, val]) => ({
      'letter-spacing': `${parseInt(val)}px`,
    }),
  ],

  // line-height
  [
    /^(?:text|t|line)-(?:height|h)-(\d+)(x?)$/,
    ([, val, multi]) => ({
      'line-height': multi ? `${parseInt(val)}` : `${parseInt(val)}px`,
    }),
  ],

  // text-align
  [
    /^(?:text|t)-(left|right|start|end|center|justify)$/,
    ([, val]) => ({
      'text-align': val,
    }),
  ],

  // text-color (keywords)
  [
    /^(?:text|t)-(inherit|current|transparent|black|white)$/,
    ([, color]) => ({
      color: colors[color],
    }),
  ],

  // text-color (palette)
  [
    /^(?:text|t)-(rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark)(?:-?)(\d+)?$/,
    ([, color, val]) => ({
      color: colors[color]
        ? val
          ? colors[color][val as keyof object]
          : colors[color]['500' as keyof object]
        : color,
    }),
  ],

  // background-color (palette)
  [
    /^(rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark)(?:-?)(\d+)?$/,
    ([, color, val]) => ({
      'background-color': colors[color]
        ? val
          ? colors[color][val as keyof object]
          : colors[color]['500' as keyof object]
        : color,
    }),
  ],

  // text-decoration
  [
    /^(underline|overline|line-through|no-underline)$/,
    ([, val]) => ({
      'text-decoration-line': val === 'no-underline' ? 'none' : val,
    }),
  ],

  // text-decoration-color (keywords)
  [
    /^decoration-(inherit|current|transparent|black|white)$/,
    ([, color]) => ({
      'text-decoration-color': colors[color] ?? color,
    }),
  ],

  // text-decoration-color (palette)
  [
    /^decoration-(rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark)(?:-?)(\d+)?$/,
    ([, color, val]) => ({
      'text-decoration-color': colors[color]
        ? val
          ? colors[color][val as keyof object]
          : colors[color]['500' as keyof object]
        : color,
    }),
  ],

  // text-decoration-style
  [
    /^decoration-(solid|double|dotted|dashed|wavy)$/,
    ([, val]) => ({
      'text-decoration-style': val,
    }),
  ],

  // text-decoration-thickness
  [
    /^decoration-(auto|from-font)$/,
    ([, val]) => ({
      'text-decoration-thickness': val,
    }),
  ],
  [
    /^decoration-(\d+)(x?)$/,
    ([, val, multi]) => ({
      'text-decoration-thickness': multi
        ? `${parseInt(val) / 4}rem`
        : `${parseInt(val)}px`,
    }),
  ],

  // text-underline-offset
  [
    /^underline-offset-(auto)$/,
    ([, val]) => ({
      'text-underline-offset': val,
    }),
  ],
  [
    /^underline-offset-(\d+)(x?)$/,
    ([, val, multi]) => ({
      'text-underline-offset': multi
        ? `${parseInt(val) / 4}rem`
        : `${parseInt(val)}px`,
    }),
  ],

  // text-indent
  [
    /^indent-(\d+)(x?)$/,
    ([, val, multi]) => ({
      'text-indent': multi ? `${parseInt(val) / 4}rem` : `${parseInt(val)}px`,
    }),
  ],

  // text-transform
  [
    /^(uppercase|lowercase|capitalize|normal-case)$/,
    ([, val]) => ({
      'text-transform': val === 'normal-case' ? 'none' : val,
    }),
  ],

  // text-orientation
  [
    /^orientation-(mixed|upright|sideways)$/,
    ([, val]) => ({
      'text-orientation': val,
    }),
  ],

  // -webkit-text-stroke-width
  [
    /^stroke-w-(\d+)(x?)$/,
    ([, val, multi]) => ({
      '-webkit-text-stroke-width': multi
        ? `${parseInt(val) / 4}rem`
        : `${parseInt(val)}px`,
    }),
  ],

  // -webkit-text-stroke-color (keywords)
  [
    /^stroke-(inherit|current|transparent|black|white)$/,
    ([, color]) => ({
      '-webkit-text-stroke-color': colors[color] ?? color,
    }),
  ],

  // -webkit-text-stroke-color (palette)
  [
    /^stroke-(rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark)(?:-?)(\d+)?$/,
    ([, color, val]) => ({
      '-webkit-text-stroke-color': colors[color]
        ? val
          ? colors[color][val as keyof object]
          : colors[color]['500' as keyof object]
        : color,
    }),
  ],

  // white-space
  [
    /^whitespace-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)$/,
    ([, val]) => ({
      'white-space': val,
    }),
  ],

  // writing-mode
  [
    /^writing-(horizontal-tb|vertical-rl|vertical-lr)$/,
    ([, val]) => ({
      'writing-mode': val,
    }),
  ],
]
