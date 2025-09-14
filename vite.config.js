import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/app.js"],
            refresh: true, // enables blade + hot reload
        }),
        vue(),
        tailwindcss(),
    ],
    server: {
        host: "0.0.0.0", // Allow external connections
        port: 5173,
        hmr: {
            host: "localhost",
            port: 5173,
        },
    },
    watch: {
        usePolling: true, // important inside Docker
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
