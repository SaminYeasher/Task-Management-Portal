import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Task Portal',
        short_name: 'TaskPortal',
        description: 'Project & Task Management Portal',
        theme_color: '#fafafa',
        background_color: '#fafafa',
        display: 'standalone',
        icons: [
          {
            src: 'icon1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon2.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon2.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module',
      }
    })
  ],
})
