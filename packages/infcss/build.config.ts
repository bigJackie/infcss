import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index', './src/vite'],
  clean: true,
  declaration: true,
  externals: ['@infcss/core', '@infcss/vite', '@infcss/presets'],
  rollup: {
    emitCJS: true,
  },
})
