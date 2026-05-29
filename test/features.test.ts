import { describe, expect, it } from 'vitest'
import { useInfCSS } from '@infcss/core'

const { generateCSSStyle } = useInfCSS()

describe.concurrent('features', () => {
  it('important', () => {
    const style = '!t-20'
    expect(generateCSSStyle(style)).toEqual(
      '.\\!t-20{font-size:20px !important;}',
    )
  })

  it('hover', () => {
    const style = 'hover:text-0 !hover:t-height-20'
    expect(generateCSSStyle(style)).toEqual(
      '.hover\\:text-0:hover{font-size:0px;}.\\!hover\\:t-height-20:hover{line-height:20px !important;}',
    )
  })

  it('group', () => {
    const style = ' hover:(text-80 t-spacing-30) !focus:(text-80 t-spacing-30)'
    expect(generateCSSStyle(style)).toEqual(
      '.hover\\:text-80:hover{font-size:80px;}.hover\\:t-spacing-30:hover{letter-spacing:30px;}.\\!focus\\:text-80:focus{font-size:80px !important;}.\\!focus\\:t-spacing-30:focus{letter-spacing:30px !important;}',
    )
  })

  it('dark', () => {
    const style = 't-20 dark:t-40'
    expect(generateCSSStyle(style)).toEqual(
      '.t-20{font-size:20px;}.dark .dark\\:t-40{font-size:40px;}',
    )
  })

  it('wrapper:sm', () => {
    const style = 't-30 !sm:focus:t-40'
    expect(generateCSSStyle(style)).toEqual(
      '.t-30{font-size:30px;}@media(max-width:640px){.\\!sm\\:focus\\:t-40:focus{font-size:40px !important;}}',
    )
  })

  it('wrapper:xl', () => {
    const style = 't-40 xl:t-40'
    expect(generateCSSStyle(style)).toEqual(
      '.t-40{font-size:40px;}@media(max-width:1280px){.xl\\:t-40{font-size:40px;}}',
    )
  })

  it('wrapper:3xl', () => {
    const style = 't-50 3xl:hover:t-40'
    expect(generateCSSStyle(style)).toEqual(
      '.t-50{font-size:50px;}@media(max-width:1920px){.3xl\\:hover\\:t-40:hover{font-size:40px;}}',
    )
  })
})
