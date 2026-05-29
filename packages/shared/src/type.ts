export type CSSValue = string | string[]
export type ParsedResult = Record<string, CSSValue | Record<string, CSSValue>>
export type Rule = [RegExp, (args: string[]) => ParsedResult]

export type VariantItem = (s: string) => string
export type Variant = {
  match: VariantItem
  selector?: VariantItem
  rewrite?: VariantItem
  wrapper?: VariantItem
}

export type InfCSSConfig = {
  rules?: Rule[]
  variants?: Variant[]
}
