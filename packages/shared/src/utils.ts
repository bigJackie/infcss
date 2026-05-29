export function isFunction(value: unknown): value is () => unknown {
  return typeof value === 'function'
}

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
