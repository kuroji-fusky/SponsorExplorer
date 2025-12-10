import adapter from "@sveltejs/adapter-cloudflare"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { mdsvex } from "mdsvex"

import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  extensions: [".svelte", ".svx"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".svx", ".md"],
      layout: { _: `${__dirname}/src/mdsvex.svelte` },
    }),
  ],
  kit: {
    adapter: adapter(),
    csp: {
      directives:
        // biome-ignore format: readability
        {
          "script-src": ["self", "unsafe-eval", "www.youtube.com"],
          "font-src": ["self"],
          "connect-src": ["self", "https:", "localhost:*", "api.fusky.dev", "yt3.ggpht.com", "i.ytimg.com"],
          "frame-ancestors": ["self", "https://www.youtube-nocookie.com"],
          "upgrade-insecure-requests": true
        },
      mode: "nonce",
    },
  },
}

export default config
