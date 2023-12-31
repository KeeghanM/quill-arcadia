import { defineConfig } from "astro/config"
import solidJs from "@astrojs/solid-js"
import vercel from "@astrojs/vercel/serverless"
import auth from "auth-astro"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), auth(), tailwind()],
  output: "server",
  adapter: vercel(),
  vite: {
    optimizeDeps: { exclude: ["auth:config"] },
  },
})
