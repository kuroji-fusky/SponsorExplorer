import adapter from "@sveltejs/adapter-cloudflare"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { mdsvex } from "mdsvex"
import { dirname } from "path"
import { fileURLToPath } from "url"
import type { Config as SvelteConfig } from "@sveltejs/kit"
import type { PreprocessorGroup } from "svelte/compiler"

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = {
  extensions: [".svelte", ".svx"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".svx"],
      layout: { _: `${__dirname}/src/mdsvex.svelte` },
      smartypants: {
        dashes: "oldschool",
      },
    }) as PreprocessorGroup,
  ],
  kit: {
    adapter: adapter(),
    csp: {
      directives:
      // biome-ignore format: readability
      {
        "script-src": ["self", "https:", "youtube.com", "tenor.com", "static.cloudflareinsights.com"],
        "font-src": ["self"],
        "connect-src": ["self", "https:", "localhost:*", "youtube.com", "se-api.fusky.dev", "yt3.ggpht.com", "i.ytimg.com"],
        "frame-ancestors": ["self", "tenor.com", "https://www.youtube-nocookie.com"],
        "worker-src": ["self", "blob:"],
        "upgrade-insecure-requests": true
      },
      mode: "nonce",
    },
  },
} satisfies SvelteConfig

export default config
