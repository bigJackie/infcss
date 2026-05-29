import { isFunction, isString } from '@infcss/shared'
import type {
  InfCSSConfig,
  ParsedResult,
  Rule,
  Variant,
  VariantItem,
} from '@infcss/shared'
import {
  rules as presetRules,
  variants as presetVariants,
} from '@infcss/presets'

type MergeStyleProps = {
  className: string
  attrs: ParsedResult
  selectors: VariantItem[]
  rewrites: VariantItem[]
  wrapper: VariantItem
}

export function useInfCSS(config: InfCSSConfig = {}) {
  const rules: Rule[] = [...presetRules]
  const variants: Variant[] = [...presetVariants]
  const cachedRule: Map<string, string> = new Map()

  //region 初始化配置
  if (config.rules?.length) {
    rules.unshift(...config.rules)
  }

  if (config.variants?.length) {
    variants.unshift(...config.variants)
  }
  //endregion

  const matchRule = (classItem: string, rule: Rule): ParsedResult | null => {
    const [regex, parser] = rule
    const res = regex.exec(classItem)

    return !!res ? parser(res) : null
  }

  const matchGroup = (line: string): string => {
    const groupRegExp = /(\S*?:)\(([\s\S]*?)\)/g

    return line.replace(
      groupRegExp,
      (_, selectors: string, classNames: string) => {
        return classNames
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map(className => `${selectors}${className}`)
          .join(' ')
      },
    )
  }

  const matchVariant = (classItem: string) => {
    const ruleSelectors: VariantItem[] = []
    const ruleRewrites: VariantItem[] = []
    // 多 wrapper 链式组合，后包前，避免覆盖
    let ruleWrapper: VariantItem = v => v
    let ruleName: string = classItem

    for (const variant of variants) {
      const variantItem = variant.match(ruleName)
      if (!variantItem) continue

      ruleName = variantItem

      const { selector, rewrite, wrapper } = variant

      if (selector) {
        ruleSelectors.push(selector)
      }

      if (rewrite) {
        ruleRewrites.push(rewrite)
      }

      if (wrapper) {
        const prevWrapper = ruleWrapper
        ruleWrapper = v => wrapper(prevWrapper(v))
      }
    }

    return { ruleName, ruleSelectors, ruleRewrites, ruleWrapper }
  }

  const mergeStyle = (props: MergeStyleProps): string => {
    const { className, attrs, selectors, rewrites, wrapper } = props

    let mergedLine = ''
    let mergedClassName = className

    selectors.forEach(selector => {
      if (isFunction(selector)) {
        mergedClassName = selector(mergedClassName)
      }
    })

    const applyRewrites = (declaration: string): string => {
      return rewrites.reduce((decl, rewrite) => {
        return isFunction(rewrite) ? rewrite(decl) : decl
      }, declaration)
    }

    Object.entries(attrs).forEach(([prop, value]) => {
      if (isString(value)) {
        // 普通字符串
        mergedLine += `${applyRewrites(`${prop}:${value}`)};`
      } else if (Array.isArray(value)) {
        // prefix 数组，展开为多条声明
        value.forEach(v => {
          mergedLine += `${applyRewrites(`${prop}:${v}`)};`
        })
      } else {
        // 嵌套对象 { border: { width: '1px', color: 'red' } }，展开为 border-width: 1px; border-color: red;
        Object.entries(value).forEach(([subProp, subValue]) => {
          if (Array.isArray(subValue)) {
            subValue.forEach(v => {
              mergedLine += `${applyRewrites(`${prop}-${subProp}:${v}`)};`
            })
          } else {
            mergedLine += `${applyRewrites(`${prop}-${subProp}:${subValue}`)};`
          }
        })
      }
    })

    return wrapper(`.${mergedClassName}{${mergedLine}}`)
  }

  const generateCSSStyle = (line: string): string => {
    const matchedLine = matchGroup(line)
    const classItems = matchedLine.trim().split(/\s+/).filter(Boolean)
    let css = ''

    for (const classItem of classItems) {
      // 缓存命中：直接取值并追加，跳过整个 rule 遍历
      if (cachedRule.has(classItem)) {
        css += cachedRule.get(classItem)!
        continue
      }

      const { ruleName, ruleSelectors, ruleRewrites, ruleWrapper } =
        matchVariant(classItem)

      for (const rule of rules) {
        const matchRes = matchRule(ruleName, rule)

        if (!matchRes) continue

        const mergedStyle = mergeStyle({
          className: classItem,
          attrs: matchRes,
          selectors: ruleSelectors,
          rewrites: ruleRewrites,
          wrapper: ruleWrapper,
        })
        css += mergedStyle
        cachedRule.set(classItem, mergedStyle)
        break // 匹配到首条规则后停止
      }
    }

    return css
  }

  return { matchGroup, generateCSSStyle }
}
