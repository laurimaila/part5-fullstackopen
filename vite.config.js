/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3003/",
                changeOrigin: true,
            }
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        css: true,
        setupFiles: ["./tests/setupTests.js"],
        coverage: {
            provider: "v8",
            include: ["src/**/*.{jsx,js}"],
        },
    }
})