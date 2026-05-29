import jiti from 'jiti'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import type { Rule, Variant } from '@infcss/shared'

export type InfCSSConfig = {
  rules?: Rule[]
  variants?: Variant[]
}

export const defineInfCSSConfig = <T extends InfCSSConfig>(config: T) => config

const CONFIG_FILES = [
  'infcss.config.ts',
  'infcss.config.js',
  'infcss.config.mjs',
  'infcss.config.cjs',
]

/** 向上递归查找配置文件 */
export function findConfigFile(cwd = process.cwd()) {
  let dir = cwd

  while (true) {
    for (const name of CONFIG_FILES) {
      const filePath = join(dir, name)
      if (existsSync(filePath)) return filePath
    }

    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }

  return null
}

/** 加载配置文件，找不到则返回空对象 */
export function loadConfig(cwd = process.cwd()) {
  const configPath = findConfigFile(cwd)

  if (!configPath) {
    console.warn('[infcss] 未找到配置文件，使用默认配置')
    return {}
  }

  const load = jiti(dirname(configPath), {
    interopDefault: true,
    cache: false,
    requireCache: false,
  })

  try {
    const config = load(configPath)
    console.log(`[infcss] 已加载配置: ${configPath}`)
    return config.default ?? config
  } catch (err) {
    console.error(`[infcss] 配置文件加载失败: ${configPath}`)
    throw err
  }
}
