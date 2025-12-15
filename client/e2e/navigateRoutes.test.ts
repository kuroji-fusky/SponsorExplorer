import { expect, test } from "@playwright/test"

test("full raw YouTube ID should redirect to `/video/:id` route", async ({ page }) => {
  await page.goto("/https://www.youtube.com/watch?v=Q_Km-DN3Mnw")

  await expect(page).toHaveURL("/video/Q_Km-DN3Mnw")
})

test("shortened url should redirect to `/video/:id` route", async ({ page }) => {
  await page.goto("/https://youtu.be/Q_Km-DN3Mnw")

  await expect(page).toHaveURL("/video/Q_Km-DN3Mnw")
})
