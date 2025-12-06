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
        name: "Kitstory",
        start_url: "/",
        scope: "/",
        short_name: "Kitstory",
        description: "Making cringe",
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
})
