// 将 RegExp 解析为 AST，笛卡尔积展开为候选 class 名，再用 regex.test() 二次验证
type N =
  | { k: 'lit'; v: string }
  | { k: 'alt'; ns: N[] }
  | { k: 'seq'; ns: N[] }
  | { k: 'opt'; n: N }
  | { k: 'num' }
  | { k: 'any' }

const NUMS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '20',
  '24',
  '32',
  '48',
  '64',
  '100',
]
const ANYS = [
  'auto',
  'full',
  'none',
  'screen',
  'fit',
  'min',
  'max',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '3/4',
]

function expand(n: N): string[] {
  switch (n.k) {
    case 'lit':
      return [n.v]
    case 'num':
      return NUMS
    case 'any':
      return ANYS
    case 'opt':
      return ['', ...expand(n.n)]
    case 'alt':
      return n.ns.flatMap(expand)
    case 'seq':
      return n.ns.reduce<string[]>(
        (acc, c) => {
          const parts = expand(c)
          const out: string[] = []
          for (const a of acc) {
            for (const p of parts) {
              out.push(a + p)
              if (out.length > 5000) return out
            }
          }
          return out
        },
        [''],
      )
  }
}

function parseAlt(s: string, p: number): [N, number] {
  const opts: N[] = []
  let [n, pos] = parseSeq(s, p)
  opts.push(n)
  while (pos < s.length && s[pos] === '|') {
    ;[n, pos] = parseSeq(s, pos + 1)
    opts.push(n)
  }
  return [opts.length === 1 ? opts[0] : { k: 'alt', ns: opts }, pos]
}

function parseSeq(s: string, p: number): [N, number] {
  const ns: N[] = []
  let pos = p,
    lit = ''
  const flush = () => {
    if (lit) {
      ns.push({ k: 'lit', v: lit })
      lit = ''
    }
  }

  while (pos < s.length && s[pos] !== ')' && s[pos] !== '|') {
    const [atom, np] = parseAtom(s, pos)
    pos = np
    let q: string | null = null
    if (pos < s.length && /[?+*]/.test(s[pos])) {
      q = s[pos++]
      if (s[pos] === '?') pos++
    }
    if (atom.k === 'lit' && !q) {
      lit += atom.v
      continue
    }
    flush()
    ns.push(q === '?' || q === '*' ? { k: 'opt', n: atom } : atom)
  }
  flush()
  if (!ns.length) return [{ k: 'lit', v: '' }, pos]
  return [ns.length === 1 ? ns[0] : { k: 'seq', ns }, pos]
}

function parseAtom(s: string, p: number): [N, number] {
  const c = s[p]
  if (c === '\\') {
    const n = s[p + 1] ?? ''
    if (n === 'd') return [{ k: 'num' }, p + 2]
    if (/[SwW]/.test(n)) return [{ k: 'any' }, p + 2]
    return [{ k: 'lit', v: n }, p + 2]
  }
  if (c === '(') {
    const nc = s[p + 1] === '?' && s[p + 2] === ':'
    const [inner, np] = parseAlt(s, nc ? p + 3 : p + 1)
    return [inner, np + 1]
  }
  if (c === '[') {
    let i = p + 1
    if (s[i] === '^') i++
    while (i < s.length && !(s[i] === ']' && s[i - 1] !== '\\')) i++
    return [{ k: 'any' }, i + 1]
  }
  if ('^$'.includes(c)) return [{ k: 'lit', v: '' }, p + 1]
  return [{ k: 'lit', v: c }, p + 1]
}

export function expandRegex(regex: RegExp): string[] {
  const src = regex.source.replace(/^\^/, '').replace(/\$$/, '')
  const [ast] = parseAlt(src, 0)
  return [...new Set(expand(ast))].filter(
    s => s.length > 0 && !s.endsWith('-') && regex.test(s),
  )
}
