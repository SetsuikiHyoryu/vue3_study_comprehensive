import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9491/graphql',
        changeOrigin: true,
        rewrite: (path: string): string => path.replace(/^\/api/, ''),
      },
    },
  },
})