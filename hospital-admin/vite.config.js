import path from 'path'
import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// *element-plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'utils': path.join(__dirname, './src/utils'),
      'cpn': path.join(__dirname, './src/components')
    }
  }
})