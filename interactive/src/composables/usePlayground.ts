import { ref, computed } from 'vue'
import { getCSS } from './useCatalog'

export function usePlayground() {
  const classes = ref<string[]>([])

  const cssText = computed(() =>
    classes.value
      .map(c => getCSS(c))
      .filter(Boolean)
      .join('\n\n'),
  )

  const add = (name: string) => {
    const n = name.trim()
    if (n && !classes.value.includes(n) && getCSS(n)) classes.value.push(n)
  }
  const remove = (name: string) => {
    classes.value = classes.value.filter(c => c !== name)
  }
  const clear = () => {
    classes.value = []
  }

  return { classes, cssText, add, remove, clear }
}

export type Playground = ReturnType<typeof usePlayground>
