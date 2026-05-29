<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { rules } from '@infcss/presets'
import { buildCatalog, type ClassEntry } from './composables/useCatalog.ts'
import { useSearch } from './composables/useSearch.ts'
import SearchBox from './components/SearchBox.vue'
import ResultList from './components/ResultList.vue'
import DetailPanel from './components/DetailPanel.vue'

const catalog = buildCatalog(rules)
const query = ref('')
const selected = ref<ClassEntry | null>(null)
const searchBox = ref<InstanceType<typeof SearchBox>>()

const { results } = useSearch(catalog, query)

const QUICK_TAGS = [
  'border',
  'flex',
  'text',
  'opacity',
  'margin',
  'cursor',
  'overflow',
]

function pick(tag: string) {
  query.value = tag
  selected.value = null
}
function clearAll() {
  query.value = ''
  selected.value = null
}

// 按 / 聚焦搜索框
onMounted(() => {
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      e.preventDefault()
      searchBox.value?.focus()
    }
  })
})
</script>

<template>
  <div class="pg">
    <!-- ── Header ── -->
    <header class="hd">
      <div class="brand">
        <span class="brand-name">InfCSS</span>
        <span class="brand-sub">交互式</span>
      </div>
      <a
        href="https://github.com/bigJackie/infcss"
        target="_blank"
        rel="noopener noreferrer"
        class="gh-btn"
        title="GitHub"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
          />
        </svg>
      </a>
    </header>

    <!-- ── Body ── -->
    <div class="body">
      <!-- Left -->
      <div class="left">
        <SearchBox ref="searchBox" v-model="query" />

        <!-- 空状态 -->
        <div v-if="!query" class="welcome">
          <div class="welcome-icon">⚡</div>
          <p class="welcome-title">
            欢迎使用 InfCSS
            <b>交互式</b>
            文档
          </p>
          <p class="welcome-sub">输入任何内容来搜索原子化工具类</p>
          <div class="tags">
            <span v-for="t in QUICK_TAGS" :key="t" class="tag" @click="pick(t)">
              {{ t }}
            </span>
          </div>
        </div>

        <!-- 搜索结果 -->
        <ResultList
          v-else
          :results="results"
          :selected="selected"
          @select="selected = $event"
        />
      </div>

      <!-- Right -->
      <div class="right">
        <!-- 选中了某条目 -->
        <DetailPanel v-if="selected" :entry="selected" :key="selected.name" />

        <!-- 未选中 -->
        <div v-else class="right-idle">
          <!-- 有搜索词但未选中 -->
          <p v-if="query" class="idle-hint">← 点击左侧条目查看详情</p>

          <!-- 完全空闲：显示统计 -->
          <div v-else class="stats">
            <div class="stat-row">
              <b>{{ catalog.length }}</b>
              <span>规则</span>
            </div>
            <div class="stat-row">
              <b>{{ rules.length }}</b>
              <span>匹配规则</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 全局重置 & CSS 变量 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: #111111;
  color: #cccccc;
}

:root {
  --bg: #111111;
  --surface: #181818;
  --surface2: #1e1e1e;
  --bd: #272727;
  --bd2: #333333;
  --tx: #e4e4e7;
  --dim: #4d4d55;
  --dim2: #6b7280;
  --accent: #c6a64a;
}
</style>

<style scoped>
.pg {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--tx);
  overflow: hidden;
}

/* Header */
.hd {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px 20px 12px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.brand-name {
  display: block;
  font-size: 11px;
  color: var(--dim);
}
.brand-sub {
  display: block;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.2;
}
.gh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  color: var(--dim2);
  transition: all 0.15s;
  text-decoration: none;
}
.gh-btn:hover {
  color: var(--tx);
  background: var(--surface2);
}
.gh-btn svg {
  width: 18px;
  height: 18px;
}

/* Body */
.body {
  flex: 1;
  display: grid;
  grid-template-columns: 400px 1fr;
  overflow: hidden;
}
.left {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--bd);
  overflow: hidden;
  background: var(--surface);
}
.right {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--bd) transparent;
}

/* Welcome */
.welcome {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  text-align: center;
  gap: 8px;
}
.welcome-icon {
  font-size: 44px;
  margin-bottom: 4px;
  opacity: 0.7;
}
.welcome-title {
  font-size: 17px;
  color: #aaa;
}
.welcome-title b {
  color: var(--tx);
}
.welcome-sub {
  font-size: 13px;
  color: var(--dim2);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}
.tag {
  padding: 4px 13px;
  border-radius: 5px;
  font-size: 12px;
  background: var(--surface2);
  border: 1px solid var(--bd);
  color: var(--dim2);
  cursor: pointer;
  transition: all 0.12s;
  font-family: 'JetBrains Mono', Consolas, monospace;
}
.tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Right idle */
.right-idle {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 40px 48px;
}
.idle-hint {
  font-size: 13px;
  color: var(--dim);
}
.stats {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.stat-row {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 10px;
  padding: 2px 0;
}
.stat-row b {
  font-size: 24px;
  font-weight: 700;
  color: #3a3a42;
}
.stat-row span {
  font-size: 14px;
  color: var(--dim);
  min-width: 60px;
}
</style>
