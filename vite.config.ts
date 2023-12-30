import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),UnoCSS(),
    VitePWA({ registerType: 'autoUpdate',injectRegister: 'auto',
    manifest: {
      name: 'word=>world',
      short_name: 'word=>world',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/src/assets/favicon128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'src/assets/favicon512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
  ],
})





