<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<string>({ default: '' })
const inputRef = ref<HTMLInputElement>()
defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <div class="sb">
    <svg class="sb-icon" viewBox="0 0 20 20" fill="none">
      <circle
        cx="8.5"
        cy="8.5"
        r="5"
        stroke="currentColor"
        stroke-width="1.5"
      />
      <path
        d="M13 13l3.5 3.5"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
    <input
      ref="inputRef"
      v-model="model"
      class="sb-input"
      placeholder="输入以探索..."
      autocomplete="off"
      spellcheck="false"
    />
    <button v-if="model" class="sb-clear" @click="model = ''" title="清除">
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M4 4l8 8M12 4l-8 8"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.sb {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  height: 56px;
  border-bottom: 1px solid var(--bd);
  flex-shrink: 0;
}
.sb-icon {
  width: 16px;
  height: 16px;
  color: var(--dim);
  flex-shrink: 0;
}
.sb-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--tx);
  min-width: 0;
}
.sb-input::placeholder {
  color: var(--dim);
}
.sb-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  background: var(--bd);
  border: none;
  border-radius: 50%;
  color: var(--dim2);
  cursor: pointer;
  transition: all 0.1s;
  flex-shrink: 0;
}
.sb-clear svg {
  width: 10px;
  height: 10px;
}
.sb-clear:hover {
  background: var(--bd2);
  color: var(--tx);
}
</style>
