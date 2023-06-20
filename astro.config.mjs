import { defineConfig } from "astro/config"
import solidJs from "@astrojs/solid-js"
import vercel from "@astrojs/vercel/serverless"
import auth from "auth-astro"

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), auth()],
  output: "server",
  adapter: vercel(),
})
