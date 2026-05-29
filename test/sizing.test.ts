import { describe, expect, it } from 'vitest'
import { useInfCSS } from '@infcss/core'

const { generateCSSStyle } = useInfCSS()

describe.concurrent('position', () => {
  /* width */
  it('width-full', () => {
    const style = 'width-full'
    expect(generateCSSStyle(style)).toEqual('.width-full{width:100%;}')
  })
  it('width-auto', () => {
    const style = 'width-auto'
    expect(generateCSSStyle(style)).toEqual('.width-auto{width:auto;}')
  })
  it('width-200', () => {
    const style = 'w-200'
    expect(generateCSSStyle(style)).toEqual('.w-200{width:200px;}')
  })
  it('min-width-20x', () => {
    const style = 'min-w-20x'
    expect(generateCSSStyle(style)).toEqual('.min-w-20x{min-width:5rem;}')
  })
  it('max-width-0', () => {
    const style = 'max-width-0'
    expect(generateCSSStyle(style)).toEqual('.max-width-0{max-width:0px;}')
  })

  /* height */
  it('height-screen-xl', () => {
    const style = 'height-screen-xl'
    expect(generateCSSStyle(style)).toEqual('.height-screen-xl{height:1280px;}')
  })
  it('max-height-screen-sm', () => {
    const style = 'max-h-screen-sm'
    expect(generateCSSStyle(style)).toEqual(
      '.max-h-screen-sm{max-height:640px;}',
    )
  })
  it('min-height-screen', () => {
    const style = 'min-h-screen'
    expect(generateCSSStyle(style)).toEqual('.min-h-screen{min-height:100vw;}')
  })

  /* box-sizing */
  it('border-box', () => {
    const style = 'box-border'
    expect(generateCSSStyle(style)).toEqual(
      '.box-border{-webkit-box-sizing:border-box;box-sizing:border-box;}',
    )
  })

  it('content-box', () => {
    const style = 'box-content'
    expect(generateCSSStyle(style)).toEqual(
      '.box-content{-webkit-box-sizing:content-box;box-sizing:content-box;}',
    )
  })
})
