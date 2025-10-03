import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    csp: {
      directives: {
        "script-src": ["self", "unsafe-eval", "www.youtube.com"],
        "font-src": ["self"],
        "connect-src": ["self", "https:", "localhost:*", "api.fusky.dev", "yt3.ggpht.com", "i.ytimg.com"],
        "frame-ancestors": ["self", "https://www.youtube-nocookie.com"],
        "upgrade-insecure-requests": true
      },
      mode: "nonce"
    }
  }
};

export default config;
