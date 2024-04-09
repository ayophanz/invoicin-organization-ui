import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: 'src/main.js',
      preserveEntrySignatures: 'exports-only',
      output: {
        format: 'system',
        entryFileNames: '[name].js',
      },
      external: ['axios', 'single-spa-vue'],
    },
    chunkSizeWarningLimit: 2000,
  },
  base: 'http://127.0.0.1/',
  server: {
    port: 9002,
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          base: '/src',
        },
      },
    }),
  ],
})
