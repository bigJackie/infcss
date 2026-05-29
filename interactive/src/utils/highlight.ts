const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function highlightCSS(raw: string): string {
  return raw
    .split('\n')
    .map(line => {
      const l = esc(line)
      // .selector {
      if (/^\.[^\s{]/.test(line))
        return l.replace(/^(\S+)/, '<span class="h-sel">$1</span>')
      // property: value;
      if (/^\s+[\w-]+\s*:/.test(line))
        return l
          .replace(/([\w-]+)(\s*:)/, '<span class="h-prop">$1</span>$2')
          .replace(/: (.+?)(;?\s*)$/, ': <span class="h-val">$1</span>$2')
      // { }
      return l.replace(/[{}]/g, '<span class="h-br">$&</span>')
    })
    .join('\n')
}
