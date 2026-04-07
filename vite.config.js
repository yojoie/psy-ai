import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  //配置路由
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),//配置@指向src目录
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://159.75.169.224:1235',//代理目标地址
        changeOrigin: true,//是否改变源地址的域名
      }
    }
  }
})
