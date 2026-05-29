import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  clean: true,
  declaration: true,
  externals: ['@infcss/core', '@infcss/vite', '@infcss/presets'],
  rollup: {
    emitCJS: true,
  },
})
