export * from '@infcss/core'
export * from '@infcss/shared'
export * from '@infcss/presets'

import { rules, variants } from '@infcss/presets'

export { useInfCSS } from '@infcss/core'
export type { Rule, Variant, VariantItem, InfCSSConfig } from '@infcss/shared'
export { defineInfCSSConfig } from '@infcss/shared'

export { rules as defaultRules, variants as defaultVariants }
