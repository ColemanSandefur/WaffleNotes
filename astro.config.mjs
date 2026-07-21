// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import node from "@astrojs/node";

const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  site: "https://wafflenotes.netlify.app",
  ...(isProduction
    ? {}
    : {
        adapter: node({
          mode: "standalone",
        }),
      }),

  integrations: [
    sitemap(),
    ...(isProduction ? [] : [react(), markdoc(), keystatic()]),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Source Serif 4",
      cssVariable: "--font-source-serif-4",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Libre Franklin",
      cssVariable: "--font-libre-franklin",
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
    },
  ],
});
