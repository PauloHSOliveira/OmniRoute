import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";
import { PAGES, VIEWPORTS } from "./responsiveSpecs";

const ROUTES = PAGES.filter((page) => page.requiresAuth);
const KEYBOARD_ROUTE = "/dashboard/settings/general";

for (const route of ROUTES) {
  test(`${route.name} route loads successfully`, async ({ page }) => {
    await gotoDashboardRoute(page, route.path, {
      waitUntil: "domcontentloaded",
      timeoutMs: 60_000,
    });
    await expect(page.locator("main, [role='main']").first()).toBeVisible();
  });
}

test.describe("Dashboard cross-route quality", () => {
  test("audited routes have no horizontal overflow on desktop and mobile", async ({ page }) => {
    for (const viewport of [VIEWPORTS.desktop, VIEWPORTS.mobile]) {
      await page.setViewportSize(viewport);
      for (const route of ROUTES) {
        await gotoDashboardRoute(page, route.path, {
          waitUntil: "domcontentloaded",
          timeoutMs: 60_000,
        });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        );
        expect(overflow, `Horizontal overflow at ${route.path} (${viewport.label})`).toBeFalsy();
      }
    }
  });

  test("keyboard navigation reaches interactive controls on the shell and forms", async ({
    page,
  }) => {
    await gotoDashboardRoute(page, KEYBOARD_ROUTE, {
      waitUntil: "domcontentloaded",
      timeoutMs: 60_000,
    });

    const focusedElements: string[] = [];
    for (let index = 0; index < 12; index += 1) {
      await page.keyboard.press("Tab");
      focusedElements.push(
        await page.evaluate(() => document.activeElement?.tagName.toLowerCase() ?? "")
      );
    }

    expect(
      focusedElements.some((tagName) => ["a", "button", "input", "select"].includes(tagName))
    ).toBeTruthy();
  });

  test("theme toggle updates the document theme", async ({ page }) => {
    await gotoDashboardRoute(page, KEYBOARD_ROUTE, {
      waitUntil: "domcontentloaded",
      timeoutMs: 60_000,
    });

    const toggle = page.getByRole("button", { name: /switch to (light|dark) mode/i }).first();
    await expect(toggle).toBeVisible();
    const before = await page.locator("html").getAttribute("class");
    await toggle.click();
    await expect.poll(() => page.locator("html").getAttribute("class")).not.toBe(before);
  });
});
