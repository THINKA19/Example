import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 让 ElMessage 等函数式组件在 .ts 文件里无需手动 import，并自动带上样式
      AutoImport({
        resolvers: [ElementPlusResolver()],
        dts: 'auto-imports.d.ts',
      }),
      // 模板里的 <el-xxx> 组件按需引入
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'components.d.ts',
      }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
      port: 8089,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules\/(element-plus|@element-plus)\//.test(id)) return 'element-plus'
            if (/node_modules\/(vue|@vue|vue-router|pinia)\//.test(id)) return 'vue-vendor'
          },
        },
      },
    },
})
