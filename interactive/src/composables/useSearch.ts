import { computed, type Ref } from 'vue'
import type { ClassEntry } from './useCatalog'

export interface SearchResult extends ClassEntry {
  score: number
  highlights: [number, number][]
}

function scoreMatch(
  q: string,
  t: string,
): { s: number; hl: [number, number][] } {
  const ql = q.toLowerCase(),
    tl = t.toLowerCase()
  if (tl === ql) return { s: 1e6, hl: [[0, t.length]] }
  if (tl.startsWith(ql)) return { s: 5e5 - t.length, hl: [[0, ql.length]] }
  const i = tl.indexOf(ql)
  if (i >= 0) return { s: 2e5 - t.length, hl: [[i, i + ql.length]] }

  // 模糊匹配：按字符顺序，连续命中加分
  let qi = 0,
    pts = 0,
    streak = 0,
    start = -1
  const hl: [number, number][] = []
  for (let ti = 0; ti < tl.length && qi < ql.length; ti++) {
    if (tl[ti] === ql[qi]) {
      if (start < 0) start = ti
      qi++
      streak++
      pts += streak * 5
    } else {
      if (start >= 0) {
        hl.push([start, ti])
        start = -1
      }
      streak = 0
    }
  }
  if (start >= 0) hl.push([start, tl.length])
  return qi === ql.length ? { s: pts - t.length, hl } : { s: 0, hl: [] }
}

const CAT_ORDER = [
  'Display',
  'Flexbox',
  'Layout',
  'Spacing',
  'Sizing',
  'Typography',
  'Border',
  'Effects',
  'Colors',
  'Other',
]

export function useSearch(catalog: ClassEntry[], query: Ref<string>) {
  const results = computed<SearchResult[]>(() => {
    const q = query.value.trim()
    if (!q) {
      // 无搜索词：按分类展示前 15 条
      const seen = new Map<string, number>()
      return catalog
        .slice()
        .sort(
          (a, b) =>
            CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category),
        )
        .filter(e => {
          const n = seen.get(e.category) ?? 0
          if (n >= 15) return false
          seen.set(e.category, n + 1)
          return true
        })
        .map(e => ({ ...e, score: 0, highlights: [] }))
    }
    return catalog
      .map(e => {
        const { s, hl } = scoreMatch(q, e.name)
        return { ...e, score: s, highlights: hl }
      })
      .filter(e => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 200)
  })

  const grouped = computed(() => {
    const raw = new Map<string, SearchResult[]>()
    for (const r of results.value) {
      if (!raw.has(r.category)) raw.set(r.category, [])
      raw.get(r.category)!.push(r)
    }
    const out = new Map<string, SearchResult[]>()
    for (const c of CAT_ORDER) if (raw.has(c)) out.set(c, raw.get(c)!)
    for (const [c, v] of raw) if (!out.has(c)) out.set(c, v)
    return out
  })

  return { results, grouped }
}
