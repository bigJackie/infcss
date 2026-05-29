import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@infcss/core': resolve(__dirname, './packages/core/src/index.ts'),
    },
  },
})
