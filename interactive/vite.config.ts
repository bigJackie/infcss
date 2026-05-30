import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import InfCSSVite from 'inf-css/vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/projects/infcss/' : '/',
  plugins: [vue(), InfCSSVite()],
}))
