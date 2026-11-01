
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },

    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
            '/sanctum': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
            },
        },
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (
                            id.includes('/node_modules/vue/') ||
                            id.includes('/node_modules/@vue/') ||
                            id.includes('/node_modules/vue-router/')
                        ) {
                            return 'vue-vendor'
                        }

                        if (id.includes('/node_modules/lucide-vue-next/')) {
                            return 'icons'
                        }

                        if (id.includes('/node_modules/bootstrap/')) {
                            return 'bootstrap'
                        }
                    }
                },
            },
        },
    },
})
