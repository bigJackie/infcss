import { describe, expect, it } from 'vitest'
import { useInfCSS } from '@infcss/core'

const { generateCSSStyle } = useInfCSS()

describe.concurrent('position', () => {
  /* justify-content */
  it('justify-start', () => {
    const style = 'justify-start'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-start{-webkit-box-pack:start;-ms-flex-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;}',
    )
  })
  it('justify-end', () => {
    const style = 'justify-end'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-end{-webkit-box-pack:end;-ms-flex-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end;}',
    )
  })
  it('justify-center', () => {
    const style = 'justify-center'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-center{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;}',
    )
  })
  it('justify-between', () => {
    const style = 'justify-between'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-between{-webkit-box-pack:justify;-ms-flex-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;}',
    )
  })
  it('justify-around', () => {
    const style = 'justify-around'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-around{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around;}',
    )
  })
  it('justify-evenly', () => {
    const style = 'justify-evenly'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-evenly{-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;-webkit-justify-content:space-evenly;justify-content:space-evenly;}',
    )
  })

  /* justify-items */
  it('justify-items', () => {
    const style = 'justify-items-center'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-items-center{justify-items:center;}',
    )
  })

  /* justify-self */
  it('justify-self', () => {
    const style = 'justify-self-auto'
    expect(generateCSSStyle(style)).toEqual(
      '.justify-self-auto{-ms-grid-column-align:auto;justify-self:auto;}',
    )
  })

  /* align-content */
  it('align-start', () => {
    const style = 'content-start'
    expect(generateCSSStyle(style)).toEqual(
      '.content-start{-ms-flex-line-pack:start;-webkit-align-content:flex-start;align-content:flex-start;}',
    )
  })
  it('align-end', () => {
    const style = 'content-end'
    expect(generateCSSStyle(style)).toEqual(
      '.content-end{-ms-flex-line-pack:end;-webkit-align-content:flex-end;align-content:flex-end;}',
    )
  })
  it('align-center', () => {
    const style = 'content-center'
    expect(generateCSSStyle(style)).toEqual(
      '.content-center{-ms-flex-line-pack:center;-webkit-align-content:center;align-content:center;}',
    )
  })

  /* align-items */
  it('align-items-start', () => {
    const style = 'items-start'
    expect(generateCSSStyle(style)).toEqual(
      '.items-start{-webkit-box-align:start;-ms-flex-align:start;-webkit-align-items:flex-start;align-items:flex-start;}',
    )
  })
  it('align-items-end', () => {
    const style = 'items-end'
    expect(generateCSSStyle(style)).toEqual(
      '.items-end{-webkit-box-align:end;-ms-flex-align:end;-webkit-align-items:flex-end;align-items:flex-end;}',
    )
  })
  it('align-items-center', () => {
    const style = 'items-center'
    expect(generateCSSStyle(style)).toEqual(
      '.items-center{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;}',
    )
  })
  it('align-items-baseline', () => {
    const style = 'items-baseline'
    expect(generateCSSStyle(style)).toEqual(
      '.items-baseline{-webkit-box-align:baseline;-ms-flex-align:baseline;-webkit-align-items:baseline;align-items:baseline;}',
    )
  })
  it('align-items-stretch', () => {
    const style = 'items-stretch'
    expect(generateCSSStyle(style)).toEqual(
      '.items-stretch{-webkit-box-align:stretch;-ms-flex-align:stretch;-webkit-align-items:stretch;align-items:stretch;}',
    )
  })

  /* align-self */
  it('align-self-auto', () => {
    const style = 'self-auto'
    expect(generateCSSStyle(style)).toEqual(
      '.self-auto{-ms-flex-item-align:auto;-ms-grid-row-align:auto;-webkit-align-self:auto;align-self:auto;}',
    )
  })
  it('align-self-center', () => {
    const style = 'self-center'
    expect(generateCSSStyle(style)).toEqual(
      '.self-center{-ms-flex-item-align:center;-ms-grid-row-align:center;-webkit-align-self:center;align-self:center;}',
    )
  })
  it('align-self-stretch', () => {
    const style = 'self-stretch'
    expect(generateCSSStyle(style)).toEqual(
      '.self-stretch{-ms-flex-item-align:stretch;-ms-grid-row-align:stretch;-webkit-align-self:stretch;align-self:stretch;}',
    )
  })
  it('align-self-start', () => {
    const style = 'self-start'
    expect(generateCSSStyle(style)).toEqual(
      '.self-start{-ms-flex-item-align:start;-webkit-align-self:flex-start;align-self:flex-start;}',
    )
  })
  it('align-self-end', () => {
    const style = 'self-end'
    expect(generateCSSStyle(style)).toEqual(
      '.self-end{-ms-flex-item-align:end;-webkit-align-self:flex-end;align-self:flex-end;}',
    )
  })

  /* place-content */
  it('place-content', () => {
    const style = 'place-content-center'
    expect(generateCSSStyle(style)).toEqual(
      '.place-content-center{place-content:center;}',
    )
  })
  it('place-content', () => {
    const style = 'place-content-around'
    expect(generateCSSStyle(style)).toEqual(
      '.place-content-around{place-content:space-around;}',
    )
  })

  /* place-items */
  it('place-items', () => {
    const style = 'place-items-auto'
    expect(generateCSSStyle(style)).toEqual(
      '.place-items-auto{place-items:auto;}',
    )
  })

  /* place-self */
  it('place-self', () => {
    const style = 'place-self-stretch'
    expect(generateCSSStyle(style)).toEqual(
      '.place-self-stretch{-ms-grid-row-align:stretch;-ms-grid-column-align:stretch;place-self:stretch;}',
    )
  })

  /* position */
  it('fixed', () => {
    const style = 'fixed'
    expect(generateCSSStyle(style)).toEqual('.fixed{position:fixed;}')
  })

  it('sticky', () => {
    const style = 'sticky'
    expect(generateCSSStyle(style)).toEqual(
      '.sticky{position:-webkit-sticky;position:sticky;}',
    )
  })

  /* direction */
  it('top', () => {
    const style = 'top-0'
    expect(generateCSSStyle(style)).toEqual('.top-0{top:0px;}')
  })
  it('right', () => {
    const style = 'right-20'
    expect(generateCSSStyle(style)).toEqual('.right-20{right:20px;}')
  })
  it('bottom', () => {
    const style = 'bottom-3x'
    expect(generateCSSStyle(style)).toEqual('.bottom-3x{bottom:0.75rem;}')
  })
  it('left', () => {
    const style = 'left-auto'
    expect(generateCSSStyle(style)).toEqual('.left-auto{left:auto;}')
  })

  /* float */
  it('float', () => {
    const style = 'float-left'
    expect(generateCSSStyle(style)).toEqual('.float-left{float:left;}')
  })
  /* clear */
  it('clear', () => {
    const style = 'clear-both'
    expect(generateCSSStyle(style)).toEqual('.clear-both{clear:both;}')
  })
  /* z-index */
  it('z-index', () => {
    const style = 'z-auto'
    expect(generateCSSStyle(style)).toEqual('.z-auto{z-index:auto;}')
  })
  it('z-index', () => {
    const style = 'z-0'
    expect(generateCSSStyle(style)).toEqual('.z-0{z-index:0;}')
  })
  it('z-index', () => {
    const style = 'z-999'
    expect(generateCSSStyle(style)).toEqual('.z-999{z-index:999;}')
  })
  it('z-index', () => {
    const style = '-z-3'
    expect(generateCSSStyle(style)).toEqual('.-z-3{z-index:-3;}')
  })
})
