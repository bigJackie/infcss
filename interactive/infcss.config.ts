import { InfCSSConfig, defineInfCSSConfig } from '@infcss/config'

export default defineInfCSSConfig<InfCSSConfig>({
  rules: [
    [/^text-big$/, () => ({ 'font-size': '96px' })],
    // ignore first parameter
    [/^(?:width|w)-(\d+)%$/, ([, val]) => ({ width: `${val}%` })],
  ],
  variants: [],
})
