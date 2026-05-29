import { border } from './border.ts'
import { cursor } from './cursor.ts'
import { display } from './display.ts'
import { flexbox } from './flexbox.ts'
import { font } from './font.ts'
import { opacity } from './opacity.ts'
import { overflow } from './overflow.ts'
import { position } from './position.ts'
import { sizing } from './sizing.ts'
import { spacing } from './spacing.ts'

export * from './border.ts'
export * from './cursor.ts'
export * from './display.ts'
export * from './flexbox.ts'
export * from './font.ts'
export * from './opacity.ts'
export * from './overflow.ts'
export * from './position.ts'
export * from './sizing.ts'
export * from './spacing.ts'
export * from './variants.ts'

export const rules = [
  border,
  cursor,
  display,
  flexbox,
  font,
  opacity,
  overflow,
  position,
  sizing,
  spacing,
].flat(1)
