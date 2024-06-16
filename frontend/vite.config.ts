import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// NOTE: This should be update if we wanted to have this production ready
const API_URL = "http://localhost:5000";
console.info("API_URL:", API_URL);

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@shared": fileURLToPath(new URL("../shared", import.meta.url))
        }
    },
    server: {
        port: 3000,
        proxy: {
            "^/api": {
                target: API_URL,
                changeOrigin: true
            }
        }
    }
});
