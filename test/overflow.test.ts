import { describe, expect, it } from 'vitest'
import { useInfCSS } from '@infcss/core'

const { generateCSSStyle } = useInfCSS()

describe.concurrent('overflow', () => {
  /* cursor */
  it('overflow-auto', () => {
    const style = 'overflow-auto'
    expect(generateCSSStyle(style)).toEqual('.overflow-auto{overflow:auto;}')
  })
  it('overflow-hidden', () => {
    const style = 'overflow-hidden'
    expect(generateCSSStyle(style)).toEqual(
      '.overflow-hidden{overflow:hidden;}',
    )
  })
  it('overflow-x-visible', () => {
    const style = 'overflow-x-visible'
    expect(generateCSSStyle(style)).toEqual(
      '.overflow-x-visible{overflow-x:visible;}',
    )
  })
  it('overflow-y-scroll', () => {
    const style = 'overflow-y-scroll'
    expect(generateCSSStyle(style)).toEqual(
      '.overflow-y-scroll{overflow-y:scroll;}',
    )
  })

  /* scroll behavior */
  it('scroll-auto', () => {
    const style = 'scroll-auto'
    expect(generateCSSStyle(style)).toEqual(
      '.scroll-auto{scroll-behavior:auto;}',
    )
  })
  it('scroll-smooth', () => {
    const style = 'scroll-smooth'
    expect(generateCSSStyle(style)).toEqual(
      '.scroll-smooth{scroll-behavior:smooth;}',
    )
  })
})
