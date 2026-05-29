<script setup lang="ts">
import { ref } from 'vue'
import type { ClassEntry } from '../composables/useCatalog.ts'
import { highlightCSS } from '../utils/highlight.ts'

defineProps<{ entry: ClassEntry }>()

const copied = ref(false)
async function copy(text: string) {
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="detail">
    <!-- 标题 -->
    <div class="detail-head">
      <h1 class="detail-title">
        .{{ entry.name }}
        <span
          v-if="entry.colorVal"
          class="color-dot"
          :style="{ background: entry.colorVal }"
        />
      </h1>
      <button class="copy-btn" :class="{ ok: copied }" @click="copy(entry.css)">
        {{ copied ? '✓ 已复制' : '复制 CSS' }}
      </button>
    </div>

    <!-- 规则 -->
    <section class="section">
      <div class="sec-label">规则</div>
      <div class="code-block">
        <code class="regex-code">/{{ entry.regexSource }}/</code>
      </div>
    </section>

    <!-- CSS -->
    <section class="section">
      <div class="sec-label">CSS</div>
      <div class="code-block css-block">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <pre class="css-code" v-html="highlightCSS(entry.css)" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.detail {
  padding: 32px 28px;
}

.detail-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}
.detail-title {
  flex: 1;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 22px;
  font-weight: 600;
  color: var(--tx);
  word-break: break-all;
}
.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.copy-btn {
  padding: 5px 14px;
  font-size: 12px;
  flex-shrink: 0;
  background: var(--surface2);
  border: 1px solid var(--bd);
  border-radius: 6px;
  color: var(--dim2);
  cursor: pointer;
  transition: all 0.12s;
}
.copy-btn:hover {
  border-color: var(--bd2);
  color: var(--tx);
}
.copy-btn.ok {
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.3);
}

.section {
  margin-bottom: 24px;
}
.sec-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--dim);
  margin-bottom: 8px;
}

.code-block {
  background: var(--surface2);
  border: 1px solid var(--bd);
  border-radius: 8px;
  padding: 14px 18px;
  overflow-x: auto;
}
.regex-code {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 12.5px;
  color: #a5d6a7;
  white-space: pre;
}

.css-block {
  padding: 16px 20px;
}
.css-code {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 13px;
  line-height: 1.8;
  white-space: pre;
  margin: 0;
}
:deep(.h-sel) {
  color: #e5c07b;
}
:deep(.h-prop) {
  color: #79c0ff;
}
:deep(.h-val) {
  color: #a5d6a7;
}
:deep(.h-br) {
  color: #3f3f46;
}
</style>
