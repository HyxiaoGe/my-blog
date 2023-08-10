import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      // external: ['vue', 'element-plus', 'markdown-it'], // 将 vue 和 Element Plus 作为外部依赖，不会打包到 chunk-vendors.js 中
      // 通过 manualChunks 配置进行公共代码抽离
      output: {
        manualChunks: {
          // 将 vue 和 Element Plus 单独抽离为一个 chunk
          vue: ['vue'],
          'element-plus': ['element-plus'],
          'markdown-it': ['markdown-it']
        }
      }
    }
  }
})
