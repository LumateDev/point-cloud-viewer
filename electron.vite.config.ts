import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
            enabledCollections: ['ep', 'mdi']
          })
        ],
        dts: 'src/renderer/src/auto-imports.d.ts',
        imports: ['vue', '@vueuse/core'],
        dirs: ['src/renderer/src/composables', 'src/renderer/src/stores'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon',
            enabledCollections: ['ep', 'mdi']
          })
        ],
        dts: 'src/renderer/src/components.d.ts'
      }),
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        scale: 1,
        defaultClass: 'icon'
      })
    ]
  }
})
