import { describe, expect, it } from 'vitest'
import { useInfCSS } from '@infcss/core'

const { generateCSSStyle } = useInfCSS()

describe.concurrent('font style', () => {
  /* display */
  it('block', () => {
    const style = 'block'
    expect(generateCSSStyle(style)).toEqual('.block{display:block;}')
  })
  it('inline-block', () => {
    const style = 'inline-block'
    expect(generateCSSStyle(style)).toEqual(
      '.inline-block{display:inline-block;}',
    )
  })
  it('inline', () => {
    const style = 'inline'
    expect(generateCSSStyle(style)).toEqual('.inline{display:inline;}')
  })
  it('flow-root', () => {
    const style = 'flow-root'
    expect(generateCSSStyle(style)).toEqual('.flow-root{display:flow-root;}')
  })
  it('contents', () => {
    const style = 'contents'
    expect(generateCSSStyle(style)).toEqual('.contents{display:contents;}')
  })
  it('hidden', () => {
    const style = 'hidden'
    expect(generateCSSStyle(style)).toEqual('.hidden{display:none;}')
  })
  it('list-item', () => {
    const style = 'list-item'
    expect(generateCSSStyle(style)).toEqual('.list-item{display:list-item;}')
  })

  /* visibility */
  it('visible', () => {
    const style = 'visible'
    expect(generateCSSStyle(style)).toEqual('.visible{visibility:visible;}')
  })
  it('invisible', () => {
    const style = 'invisible'
    expect(generateCSSStyle(style)).toEqual('.invisible{visibility:hidden;}')
  })
})
