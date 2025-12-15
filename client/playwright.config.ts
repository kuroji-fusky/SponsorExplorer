import { defineConfig } from "@playwright/test"

export default defineConfig({
  timeout: 60 * 1e3,
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
  },
  testDir: "e2e",
})
