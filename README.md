# 🎨 Infcss

> 轻量、可扩展的原子化 CSS 规则引擎，提供规则解析、样式生成与工程化集成能力。  
> 适用于需要**可扩展语法**与**可控输出**的前端项目(个人练手版)

## ✨ 特性

- ⚡  **按需生成**：按规则所需快速生成样式
- 🔌 **框架无关**: — 支持 Vue / React / Svelte 等
- 🧩 **模块化设计**：`core` / `presets` / `vite` / `config` 解耦
- 🎯 **规则丰富**：内置 sizing、display、flexbox、font 等常用规则
- 🔌 **易于集成**：可与 Vite 工作流配合使用
- 🧪 **测试覆盖**：包含多类规则测试用例

## 📦 项目结构

```txt
packages/
  core/       核心生成逻辑
  presets/    默认规则与主题
  vite/       Vite 集成
  config/     配置能力
  shared/     共享类型与工具
  infcss/     对外入口封装
interactive/  交互式示例应用(Vibe Coding)
test/         规则与特性测试
```

## 🚀 快速开始

### 1.安装

```bash
npm add inf-css
# 可选安装
npm install @infcss/core @infcss/presets
```

### 2.引入

```ts
// 在 Vite 配置中引入插件 
// vite.config.ts
import InfCSSVite from 'inf-css/vite'
export default defineConfig({
  plugins: [
      // 其他插件...
      InfCSSVite()
  ],
})

// 主入口引入虚拟css main.js
import 'virtual:inf.css'
```

### 3.使用

```html
<div class="w-200 h-50 red flex items-center justify-center">
    <span class="text-yellow text-32">Hello InfCSS!</span>
</div>
```

### 4.自定义规则

在项目根目录创建 infcss.config.ts

规则说明:

- rules: [正则, 解析函数] 数组，解析函数返回 CSS 属性对象
- variants: 变体处理，如 hover: focus: dark: 等前缀

```ts
import {defineInfCSSConfig} from 'inf-css'

export default defineInfCSSConfig({
  rules: [
    // 静态规则
    [/^card$/, () => ({ 'border-radius': '8px', padding: '16px' })],

    // 动态规则：gap-4 → gap: 1rem
    [/^gap-(\d+)$/, ([, v]) => ({ gap: `${+v * 0.25}rem` })],
  ],

  variants: [
    {
      // hover:bg-red → .hover\:bg-red:hover
      match:    s => s.startsWith('hover:') ? s.slice(6) : null,
      selector: s => `${s}:hover`,
    },
  ],
})

```

### 启动交互文档：

```bash
npm run interactive
```

## 🧠 设计目标

用更少的规则覆盖更多样式场景
在可读性、可维护性和生成效率之间取得平衡
保持扩展友好，便于自定义规则与主题
