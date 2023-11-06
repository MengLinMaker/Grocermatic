import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { viteSri } from './plugin/viteSri'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { icons, manifest } from './plugin/manifest'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  plugins: [
    solid(),
    viteSingleFile({ useRecommendedBuildConfig: false }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: './plugin',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      includeAssets: icons,
      manifest: manifest,
    }),
    viteSri([
      'product.grocermatic.org',
      'static.cloudflareinsights.com',
      'cloudflareinsights.com',
      'www.google-analytics.com',
      'www.googletagmanager.com',
      'fonts.googleapis.com',
    ]),
  ],
  build: {
    chunkSizeWarningLimit: 50,
  },
})
