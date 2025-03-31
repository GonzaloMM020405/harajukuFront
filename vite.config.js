import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['flowbite-vue']
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
    }
  }
})
