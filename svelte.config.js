import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

const trustedDomains = [
  "https://www.youtube-nocookie.com",
  "https://sponsor.ajay.app/"
]

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      isr: {
        expiration: 60,
        allowQuery: ["search", "handle", "id"]
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
