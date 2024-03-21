import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

const trustedDomains = ["https://www.youtube.com/", "https://sponsor.ajay.app/"]

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      isr: true,
      images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 300
      }
    }),
    csp: {
      directives: {
        "script-src": ["self", "unsafe-eval", ...trustedDomains],
        "connect-src": ["self", ...trustedDomains],
        "frame-src": [trustedDomains[0]]
      }
    }
  }
}

export default config
