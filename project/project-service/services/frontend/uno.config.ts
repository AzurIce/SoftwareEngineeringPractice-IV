// uno.config.ts
import { defineConfig, presetIcons } from 'unocss'
import { presetUno } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetIcons({}),
    presetUno()
  ]
})