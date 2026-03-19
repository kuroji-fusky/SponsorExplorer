import tailwindcss from "@tailwindcss/vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { SvelteKitPWA } from "@vite-pwa/sveltekit"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      srcDir: "./src",
      scope: "/",
      base: "/",
      mode: "development",
      manifest: {
        name: "SponsorExplorer",
        short_name: "SponsorExplorer",
        start_url: "/",
        scope: "/",
        description: "Browse sponsor segments and shit",
        display: "minimal-ui",
      },
      devOptions: {
        enabled: true,
        suppressWarnings: process.env.SUPPRESS_WARNING === "true",
        type: "module",
        navigateFallback: "/",
      },
    }),
  ],
  clearScreen: false,
})
