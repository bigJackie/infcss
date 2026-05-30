import { useInfCSS } from '@infcss/core'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import fs from 'fs'

import type { PluginOption } from 'vite'
import type { WatchEventType } from 'fs'
import { loadConfig } from '@infcss/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const infCSSPath = resolve(__dirname, '../inf.css')

const EVENT_CHANGE = 'change'
const VIRTUAL_CSS_ID = 'virtual:inf.css'

export default function InfCSSVite(): PluginOption {
  const fileRE = /\.(vue|svelte|jsx|tsx|html)$/
  const classMatchRE = /(?<=class(?:Name)?=")(.*?)(?=")/g
  const classTestRE = /class(?:Name)?="(.*?)"/

  const config = loadConfig()
  const { matchGroup, generateCSSStyle } = useInfCSS(config)

  const writtenClasses = new Set<string>()

  return {
    name: 'inf-css',
    enforce: 'pre',

    configureServer(server) {
      fs.writeFileSync(infCSSPath, '')

      fs.watch(infCSSPath, (event: WatchEventType) => {
        if (event === EVENT_CHANGE) {
          const mod = server.moduleGraph.getModuleById(VIRTUAL_CSS_ID)

          server.ws.send({
            type: 'update',
            updates: [
              {
                type: 'js-update',
                path: `/@id/${VIRTUAL_CSS_ID}`,
                acceptedPath: `/@id/${VIRTUAL_CSS_ID}`,
                timestamp: Date.now(),
              },
            ],
          })

          if (mod) {
            server.moduleGraph.invalidateModule(mod)
          }
        }
      })
    },

    resolveId(id) {
      if (id === VIRTUAL_CSS_ID) {
        return id
      }
    },

    load(id) {
      if (id === VIRTUAL_CSS_ID) {
        if (!fs.existsSync(infCSSPath)) {
          return ''
        }
        return fs.readFileSync(infCSSPath, 'utf-8')
      }
    },

    transform(code, id) {
      if (!fileRE.test(id) || !classTestRE.test(code)) return null

      let modifiedCode = code
      const inlineClass = code.match(classMatchRE) ?? []

      for (const line of inlineClass) {
        const matchedLine = matchGroup(line)
        modifiedCode = modifiedCode.replace(line, matchedLine)

        if (!writtenClasses.has(line)) {
          writtenClasses.add(line)
          try {
            fs.appendFileSync(infCSSPath, generateCSSStyle(line))
          } catch (err) {
            throw new Error(`[infcss] 无法写入 CSS 文件: ${err}`)
          }
        }
      }

      return modifiedCode
    },
  }
}
