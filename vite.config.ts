import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "速记", // 应用程序名称
        short_name: "cug'gi", // 应用程序简称
        description: "Creed Web App", // 应用程序描述
        theme_color: "#ffffff", // 主题颜色
        icons: [
          // 应用程序图标配置
          {
            src: "/favicon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      injectRegister: "auto",
      registerType: "autoUpdate", // 注册类型配置
      devOptions: {
        enabled: true, // 开发选项配置，启用插件
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Workbox 缓存策略配置
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
