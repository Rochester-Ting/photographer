import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')
export default defineConfig({
  base: '/p/',
  // 引入svg-icon
  plugins: [vue()],
  // 设置端口号
  server: {
    port: 3003
  },
  // 设置src为@
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  // 加载全局scss, 主要是为了引入px2rem方法
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
})
