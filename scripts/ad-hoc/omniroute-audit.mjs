import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = "http://127.0.0.1:20128";
const routes = [
  "/dashboard",
  "/dashboard/providers",
  "/dashboard/combos",
  "/dashboard/analytics",
  "/dashboard/settings/general",
  "/dashboard/logs",
  "/dashboard/health",
];
const browser = await chromium.launch({ headless: true });
const results = [];

async function login(page) {
  await page.goto(`${base}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(700);
  const password = page.locator('input[type="password"]').first();
  if (await password.count()) {
    await password.fill(process.env.AUDIT_PASSWORD || "CHANGEME");
    await page
      .locator('form button, button[type="submit"]')
      .first()
      .click()
      .catch(() => {});
    await page.waitForTimeout(1800);
  }
}

const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await login(page);
for (const route of routes) {
  const entry = { route };
  try {
    const response = await page.goto(`${base}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(1200);
    entry.status = response?.status() ?? null;
    entry.title = await page
      .locator("h1")
      .first()
      .textContent()
      .catch(() => "");
    entry.horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 2
    );
    const axe = await new AxeBuilder({ page }).analyze();
    entry.axeViolations = axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
    }));
    entry.focusVisible = await page.evaluate(() => {
      const button = document.querySelector("header button, nav a, main button");
      if (!button) return false;
      button.focus();
      return (
        getComputedStyle(button).outlineStyle !== "none" ||
        getComputedStyle(button).boxShadow !== "none"
      );
    });
  } catch (error) {
    entry.error = error instanceof Error ? error.message : String(error);
  }
  results.push(entry);
}

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await login(mobile);
await mobile.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded", timeout: 30000 });
await mobile.waitForTimeout(1200);
const mobileResult = await mobile.evaluate(() => ({
  width: window.innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 2,
  menuButton: Boolean(document.querySelector("header button")),
}));

const darkContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const dark = await darkContext.newPage();
await login(dark);
await dark.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded", timeout: 30000 });
await dark.evaluate(() => document.documentElement.classList.add("dark"));
await dark.waitForTimeout(500);
const darkResult = await dark.evaluate(() => {
  const body = getComputedStyle(document.body);
  const header = document.querySelector("header");
  return {
    bodyBackground: body.backgroundColor,
    bodyColor: body.color,
    headerBackground: header ? getComputedStyle(header).backgroundColor : null,
  };
});

console.log(JSON.stringify({ results, mobileResult, darkResult }, null, 2));
await browser.close();
