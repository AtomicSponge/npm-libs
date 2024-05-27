import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const LIBRARY_NAME = 'vue-image-zoom'

export default defineConfig({
  plugins: [
    vue(),
    dts({ insertTypesEntry: true, rollupTypes: true }),
    cssInjectedByJsPlugin()
  ],
  resolve: {
    alias: { '@/': new URL('./src/', import.meta.url).pathname }
  },
  build: {
    cssCodeSplit: true,
    target: 'esnext',
    outDir: './dist',
    minify: true,
    lib: {
      entry: './src/components/index.ts',
      name: LIBRARY_NAME,
      fileName: LIBRARY_NAME
    },
    rollupOptions: {
      external: [ 'vue' ],
      output: { 
        exports: 'named',
        globals: { vue: 'Vue' }
      }
    }
  }
})
