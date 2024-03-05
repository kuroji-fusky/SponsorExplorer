import type { Config } from "tailwindcss"
import typographyPlugin from "@tailwindcss/typography"

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sb: {
          sponsor: "#00d400",
          "self-promo": "#ffff00",
          "exclusive-access": "#008a5c",
          interaction: "#cc00ff",
          highlight: "#ff1684",
          intermission: "#00ffff",
          endcards: "#0202ed",
          preview: "#008fd6",
          filler: "#7300FF",
          "non-music": "#ff9900",
        },
      },
    },
  },
  plugins: [typographyPlugin],
} satisfies Config
