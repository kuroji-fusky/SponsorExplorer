import type { Config } from "tailwindcss"
import typographyPlugin from "@tailwindcss/typography"

export default {
  darkMode: "class",
  experimental: {
    optimizeUniversalDefaults: true
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sb: {
          sponsor: "var(--sb-sponsor)",
          selfpromo: "var(--sb-selfpromo)",
          "exclusive-access": "var(--sb-exclusive-access)",
          interaction: "var(--sb-interaction)",
          highlight: "var(--sb-highlight)",
          intermission: "var(--sb-intermission)",
          endcards: "var(--sb-endcards)",
          preview: "var(--sb-preview)",
          filler: "var(--sb-filler)",
          "non-music": "var(--sb-non-music)"
        }
      }
    }
  },
  plugins: [typographyPlugin]
} satisfies Config
