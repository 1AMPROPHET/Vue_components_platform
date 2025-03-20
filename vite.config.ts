import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [vue(), UnoCSS(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  server: {
    host: "127.0.0.1",
    port: 8888,
    open: false,
    cors: true,
  },
});
