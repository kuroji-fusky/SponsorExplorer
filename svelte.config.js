import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/adapter-vercel').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      isr: true,
      images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 300
      }
    })
  }
}

export default config
