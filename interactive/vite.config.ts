import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import InfCSSVite from '../packages/vite/src/index.ts'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/projects/infcss/' : '/',
  plugins: [vue(), InfCSSVite()],
}))
