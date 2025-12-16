import { defineConfig } from "@playwright/test"

const MILLISECOND = 1e3

export default defineConfig({
  timeout: 60 * MILLISECOND,
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
  },
  testDir: "e2e",
})
