import type { Variant } from '@infcss/shared'
import { screenBreakPointMap } from '../themes/index.ts'

export const variants: Variant[] = [
  // important
  {
    match: s => (s.startsWith('!') ? s.slice(1) : ''),
    selector: s => `\\${s}`,
    rewrite: s => `${s} !important`,
  },

  // screen breakpoints
  {
    match: s => (s.startsWith('xs:') ? s.slice(3) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}`,
    wrapper: s => `@media(max-width:${screenBreakPointMap}){${s}}`,
  },
  {
    match: s => (s.startsWith('sm:') ? s.slice(3) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}`,
    wrapper: s => `@media(max-width:${screenBreakPointMap['sm']}){${s}}`,
  },
  {
    match: s => (s.startsWith('md:') ? s.slice(3) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}`,
    wrapper: s => `@media(max-width:${screenBreakPointMap['md']}){${s}}`,
  },
  {
    match: s => (s.startsWith('lg:') ? s.slice(3) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}`,
    wrapper: s => `@media(max-width:${screenBreakPointMap['lg']}){${s}}`,
  },
  {
    match: s => (s.startsWith('xl:') ? s.slice(3) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}`,
    wrapper: s => `@media(max-width:${screenBreakPointMap['xl']}){${s}}`,
  },
  {
    match: s => (s.startsWith('2xl:') ? s.slice(4) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}`,
    wrapper: s => `@media(max-width:${screenBreakPointMap['2xl']}){${s}}`,
  },
  {
    match: s => (s.startsWith('3xl:') ? s.slice(4) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}`,
    wrapper: s => `@media(max-width:${screenBreakPointMap['3xl']}){${s}}`,
  },

  // pseudo class
  {
    match: s => (s.startsWith('first:') ? s.slice(6) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:first`,
  },
  {
    match: s => (s.startsWith('last:') ? s.slice(5) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:last`,
  },
  {
    match: s => (s.startsWith('odd:') ? s.slice(4) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:odd`,
  },
  {
    match: s => (s.startsWith('even:') ? s.slice(5) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:even`,
  },
  {
    match: s => (s.startsWith('visited:') ? s.slice(8) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:visited`,
  },
  {
    match: s => (s.startsWith('checked:') ? s.slice(8) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:checked`,
  },
  {
    match: s => (s.startsWith('focus-within:') ? s.slice(13) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:focus-within`,
  },
  {
    match: s => (s.startsWith('hover:') ? s.slice(6) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:hover`,
  },
  {
    match: s => (s.startsWith('focus:') ? s.slice(6) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:focus`,
  },
  {
    match: s => (s.startsWith('focus-visible:') ? s.slice(14) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:focus-visible`,
  },
  {
    match: s => (s.startsWith('active:') ? s.slice(7) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:active`,
  },
  {
    match: s => (s.startsWith('link:') ? s.slice(5) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:link`,
  },
  {
    match: s => (s.startsWith('target:') ? s.slice(7) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}:target`,
  },

  // pseudo element
  {
    match: s => (s.startsWith('before:') ? s.slice(7) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}::before`,
  },
  {
    match: s => (s.startsWith('after:') ? s.slice(6) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}::after`,
  },
  {
    match: s => (s.startsWith('first-letter:') ? s.slice(13) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}::first-letter`,
  },
  {
    match: s => (s.startsWith('first-line:') ? s.slice(11) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}::first-line`,
  },
  {
    match: s => (s.startsWith('marker:') ? s.slice(7) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}::marker`,
  },
  {
    match: s => (s.startsWith('selection:') ? s.slice(10) : ''),
    selector: s => `${s.replace(/(\\*):/g, '\\:')}::selection`,
  },
  {
    match: s => (s.startsWith('dark:') ? s.slice(5) : ''),
    selector: s => `dark .${s.replace(/(\\*):/g, '\\:')}`,
  },
]
