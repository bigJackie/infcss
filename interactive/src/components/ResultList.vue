<script setup lang="ts">
import type { ClassEntry } from '../composables/useCatalog'
import type { SearchResult } from '../composables/useSearch'

defineProps<{ results: SearchResult[]; selected: ClassEntry | null }>()
defineEmits<{ select: [ClassEntry] }>()

// 分类徽章：首字母 + 色彩
const BADGE: Record<string, { t: string; c: string }> = {
  Border: { t: 'B', c: '#a78bfa' },
  Typography: { t: 'T', c: '#34d399' },
  Flexbox: { t: 'F', c: '#60a5fa' },
  Layout: { t: 'L', c: '#fb923c' },
  Spacing: { t: 'S', c: '#f87171' },
  Sizing: { t: 'Z', c: '#c084fc' },
  Effects: { t: 'E', c: '#22d3ee' },
  Display: { t: 'D', c: '#818cf8' },
  Colors: { t: 'C', c: '#fbbf24' },
  Other: { t: 'O', c: '#6b7280' },
}

function hlName(name: string, hl: [number, number][]): string {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  if (!hl.length) return esc(name)
  let out = '',
    last = 0
  for (const [s, e] of hl) {
    out += esc(name.slice(last, s)) + `<mark>${esc(name.slice(s, e))}</mark>`
    last = e
  }
  return out + esc(name.slice(last))
}
</script>

<template>
  <div class="list">
    <div class="list-meta">{{ results.length }} 个结果</div>
    <button
      v-for="item in results"
      :key="item.name"
      class="item"
      :class="{ active: selected?.name === item.name }"
      @click="$emit('select', item)"
    >
      <!-- 分类徽章 -->
      <span
        class="badge"
        :style="{ color: BADGE[item.category]?.c ?? '#6b7280' }"
      >
        {{ BADGE[item.category]?.t ?? 'O' }}
      </span>

      <!-- 内容 -->
      <div class="item-body">
        <div class="item-name">
          <span
            v-if="item.colorVal"
            class="swatch"
            :style="{ background: item.colorVal }"
          />
          <code class="cls" v-html="'.' + hlName(item.name, item.highlights)" />
        </div>
        <div class="item-hint">{{ '{ ' + item.hint + ' }' }}</div>
      </div>
    </button>

    <div v-if="!results.length" class="no-results">没有匹配的结果</div>
  </div>
</template>

<style scoped>
.list {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--bd) transparent;
}
.list-meta {
  padding: 8px 16px 4px;
  font-size: 11px;
  color: var(--dim);
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  border-left: 2px solid transparent;
  cursor: pointer;
  text-align: left;
  transition: background 0.08s;
}
.item:hover {
  background: var(--surface2);
}
.item.active {
  background: rgba(198, 166, 74, 0.05);
  border-left-color: var(--accent);
}

.badge {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background: var(--surface2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}
.item.active .badge {
  background: rgba(198, 166, 74, 0.1);
}

.item-body {
  flex: 1;
  min-width: 0;
}
.item-name {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 2px;
}

.swatch {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.cls {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 13px;
  color: var(--accent);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cls :deep(mark) {
  background: rgba(198, 166, 74, 0.2);
  color: #fde68a;
  border-radius: 2px;
  padding: 0 1px;
}
.item-hint {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 11px;
  color: var(--dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item.active .item-hint {
  color: var(--dim2);
}

.no-results {
  padding: 40px 16px;
  text-align: center;
  font-size: 13px;
  color: var(--dim);
}
</style>
