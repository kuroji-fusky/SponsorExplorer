import type { Config } from "tailwindcss"
import typographyPlugin from "@tailwindcss/typography"
import containerPlugin from "@tailwindcss/container-queries"

export default {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  darkMode: [
    "variant",
    ["html.dark &", "@media (prefers-color-scheme: dark) { & }"],
  ],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // A specific file where SponBlock classes are stored here
    "./src/utils/mapCategory.ts",
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
          hook: "var(--sb-hook)",
          "non-music": "var(--sb-non-music)",
        },
      },
      containers: {
        "screen-2xl": "1536px",
        "screen-xl": "1280px",
        "screen-lg": "1024px",
        "screen-md": "768px",
      },
    },
  },
  plugins: [typographyPlugin, containerPlugin],
} satisfies Config
