// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://wafflenotes.netlify.app',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Source Serif 4",
    cssVariable: "--font-source-serif-4"
  }, {
    provider: fontProviders.fontsource(),
    name: "Libre Franklin",
    cssVariable: "--font-libre-franklin"
  }, {
    provider: fontProviders.fontsource(),
    name: "JetBrains Mono",
    cssVariable: "--font-jetbrains-mono"
  }, {
    provider: fontProviders.fontsource(),
    name: "Newsreader",
    cssVariable: "--font-newsreader"
  }]
});