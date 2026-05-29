import type { Rule, ParsedResult, CSSValue } from '@infcss/shared'
import { expandRegex } from '../utils/regexExpand.ts'

export interface ClassEntry {
  name: string
  css: string
  hint: string
  colorVal: string | null
  category: string
  regexSource: string // ← 新增：用于详情面板展示规则
}

// ── CSS 格式化 ────────────────────────────────────────────────
function fmtCSS(name: string, result: ParsedResult): string {
  const sel = `.${name.replace(/([^\w-])/g, '\\$1')}`
  const main: string[] = []
  const nested: string[] = []

  for (const [k, v] of Object.entries(result)) {
    if (typeof v === 'object' && !Array.isArray(v)) {
      const body = Object.entries(v as Record<string, CSSValue>)
        .map(
          ([p, val]) => `  ${p}: ${Array.isArray(val) ? val.join(' ') : val};`,
        )
        .join('\n')
      nested.push(`${k.replace(/&/g, sel)} {\n${body}\n}`)
    } else {
      main.push(`  ${k}: ${Array.isArray(v) ? v.join(' ') : v};`)
    }
  }
  return [
    ...(main.length ? [`${sel} {\n${main.join('\n')}\n}`] : []),
    ...nested,
  ].join('\n\n')
}

function getHint(result: ParsedResult): string {
  for (const [k, v] of Object.entries(result)) {
    if (typeof v !== 'object' || Array.isArray(v))
      return `${k}: ${Array.isArray(v) ? v[0] : v}`
  }
  return ''
}

const COLOR_PROPS = new Set([
  'color',
  'background-color',
  'border-color',
  'fill',
  'stroke',
  'outline-color',
])
function getColor(result: ParsedResult): string | null {
  for (const [k, v] of Object.entries(result)) {
    if (!COLOR_PROPS.has(k)) continue
    const val = (Array.isArray(v) ? v[0] : v) as string
    if (
      val &&
      !['transparent', 'currentColor', 'inherit', 'current'].includes(val)
    )
      return val
  }
  return null
}

// ── 分类推断 ──────────────────────────────────────────────────
const CATS: [RegExp, string][] = [
  [/^(flex$|inline-flex|basis|justify|items|self|place|content-)/, 'Flexbox'],
  [
    /^(block|inline|contents|hidden|list-item|flow-root|visible|invisible)$/,
    'Display',
  ],
  [/^(border|rounded|outline)/, 'Border'],
  [
    /^(text|t-|font|italic|not-italic|uppercase|lowercase|capitalize|normal-case|underline|overline|line-through|no-underline|decoration|indent|whitespace|writing|orientation|stroke)/,
    'Typography',
  ],
  [/^(static|fixed|absolute|relative|sticky|float|clear)$/, 'Layout'],
  [/^(top|right|bottom|left)(-|$)/, 'Layout'],
  [/^-?z-/, 'Layout'],
  [/^(max-|min-)?(width|w|height|h|box)/, 'Sizing'],
  [/^[mp][trblxya]-/, 'Spacing'],
  [/^(opacity|overflow|scroll|cursor|pointer|select)/, 'Effects'],
  [
    /^(rose|pink|fuchsia|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange|red|gray|slate|zinc|neutral|stone|light|dark)/,
    'Colors',
  ],
]
function getCategory(name: string): string {
  for (const [re, cat] of CATS) if (re.test(name)) return cat
  return 'Other'
}

// ── 单例 ──────────────────────────────────────────────────────
let _map = new Map<string, ClassEntry>()
let _rules: Rule[] = []

export function buildCatalog(rules: Rule[]): ClassEntry[] {
  _map = new Map()
  _rules = rules

  for (const [regex, parser] of rules) {
    for (const name of expandRegex(regex)) {
      if (_map.has(name)) continue
      try {
        const m = regex.exec(name)
        if (!m) continue
        const result = parser([...m])
        if (!Object.keys(result).length) continue
        _map.set(name, {
          name,
          css: fmtCSS(name, result),
          hint: getHint(result),
          colorVal: getColor(result),
          category: getCategory(name),
          regexSource: regex.source, // ← 新增
        })
      } catch {
        /* 跳过无效展开值 */
      }
    }
  }
  return [..._map.values()]
}

export function getCSS(name: string): string | null {
  if (_map.has(name)) return _map.get(name)!.css
  for (const [regex, parser] of _rules) {
    const m = regex.exec(name)
    if (m) {
      try {
        return fmtCSS(name, parser([...m]))
      } catch {
        /**/
      }
    }
  }
  return null
}
