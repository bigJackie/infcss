import { describe, expect, it } from 'vitest'
import { useInfCSS } from '@infcss/core'

const { generateCSSStyle } = useInfCSS()

describe.concurrent('opacity', () => {
  it('opacity-0', () => {
    const style = 'opacity-0'
    expect(generateCSSStyle(style)).toEqual('.opacity-0{opacity:0;}')
  })
  it('opacity-50', () => {
    const style = 'opacity-50'
    expect(generateCSSStyle(style)).toEqual('.opacity-50{opacity:0.5;}')
  })
  it('opacity-100', () => {
    const style = 'opacity-100'
    expect(generateCSSStyle(style)).toEqual('.opacity-100{opacity:1;}')
  })
})
