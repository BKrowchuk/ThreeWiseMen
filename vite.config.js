import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/ThreeWiseMen/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
});
