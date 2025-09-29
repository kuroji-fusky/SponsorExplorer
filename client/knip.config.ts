import type { KnipConfig } from "knip"

export default {
  eslint: {
    config: "biome.json",
  },
  entry: ["client/**/*.{ts,tsx}!"],
  project: ["client/**/*.{ts,tsx}!"],
  rules: {
    files: "warn",
    types: "error",
    duplicates: "error",
    unlisted: "off",
    dependencies: "off",
    binaries: "off",
    exports: "error",
    unresolved: "warn",
  },
  ignore: [
    "client/.next/**/*.{ts,js}",
    "client/postcss.config.mjs",
    "client/tsconfig.json",
  ],
} satisfies KnipConfig
