import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 设置代理 // '/api': 'http://127.0.0.1:9009'
    server: {
        proxy: {
           // '/api': 'http://1.15.221.58:8014/'
            '/api': 'http://127.0.0.1:9009'
        }
    }
})
