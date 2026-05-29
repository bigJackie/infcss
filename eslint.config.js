import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import pluginPrettierRecommendedConfigs from 'eslint-plugin-prettier/recommended'

export default [
  // eslint 默认推荐规则
  pluginJs.configs.recommended,
  // ts 默认推荐规则
  ...tseslint.configs.recommended,
  // vue3 基础推荐规则
  ...pluginVue.configs['flat/recommended'],
  pluginPrettierRecommendedConfigs,
  {
    ignores: ['**/node_modules', '**/dist', '**/* copy.*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
      ecmaVersion: 2022,
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
]
