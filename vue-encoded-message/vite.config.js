import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
var LIBRARY_NAME = 'vue-encoded-message';
export default defineConfig({
    plugins: [
        vue(),
        dts({ insertTypesEntry: true, rollupTypes: true }),
    ],
    build: {
        cssCodeSplit: true,
        target: 'esnext',
        outDir: './dist',
        minify: true,
        lib: {
            entry: './src/index.ts',
            name: LIBRARY_NAME,
            fileName: function (format) { return "".concat(LIBRARY_NAME, ".").concat(format, ".js"); }
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: { vue: 'Vue' }
            }
        }
    }
});
