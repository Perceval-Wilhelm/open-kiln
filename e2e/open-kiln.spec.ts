import { expect, test, type Page } from "@playwright/test";

async function assertDescriptionsExist(page: Page) {
  const missing = await page
    .getByRole("dialog")
    .locator("input, textarea")
    .evaluateAll((fields) =>
      fields.flatMap((field) =>
        (field.getAttribute("aria-describedby") ?? "")
          .split(/\s+/)
          .filter(Boolean)
          .filter((id) => !document.getElementById(id)),
      ),
    );
  expect(missing).toEqual([]);
}

test("search, evidence, library and both audience journeys", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Verify, not just trust.", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Explore a sample", exact: true }).click();
  await expect(page.getByLabel("Manifest ID", { exact: true })).toBeFocused();
  await page.getByLabel("Manifest ID", { exact: true }).fill(" ok-demo-003 ");
  await page.getByRole("button", { name: "Verify record", exact: true }).click();
  const opener = page.getByRole("button", { name: "View evidence", exact: true });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Evidence partial", { exact: true })).toBeVisible();
  await dialog.getByRole("tab", { name: "Evidence", exact: true }).click();
  await expect(dialog.getByText("Not available", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await page.getByLabel("Search the evidence library").fill("EPA:");
  await expect(page.getByText("1 resource · Sources and scope included", { exact: true })).toBeVisible();
  await expect(opener).toBeVisible();
  await page.getByRole("tab", { name: /Industrial Park Boards/ }).click();
  const dashboard = page.getByLabel("Sample park governance dashboard");
  await expect(dashboard).toContainText("86 of 100 records");
  await expect(dashboard).toContainText("120 tonnes");
  await page.getByLabel("Reporting period").selectOption("Q1");
  await expect(dashboard).toContainText("78 of 90 records");
  await expect(dashboard).toContainText("100 tonnes");
  await expect(dashboard.getByRole("table")).toContainText("Jan30Feb32Mar38");
  await page.getByRole("tab", { name: /EHS & Plant Managers/ }).click();
  await expect(page.getByRole("list", { name: "EHS treatment journey" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("forms have valid descriptions, validate locally and discard values on close", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(request.url());
  });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "Book a verification visit", exact: true });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByLabel("Your name", { exact: true })).toBeVisible();
  await assertDescriptionsExist(page);
  await dialog.getByRole("button", { name: "Preview request", exact: true }).click();
  await expect(dialog.getByLabel("Your name", { exact: true })).toHaveAccessibleDescription("Enter your name.");
  await expect(dialog.getByLabel("Your name", { exact: true })).toBeFocused();
  await assertDescriptionsExist(page);
  await dialog.getByRole("button", { name: "Fill sample details", exact: true }).click();
  await dialog.getByRole("button", { name: "Preview request", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("Demo complete. No request was sent.");
  await dialog.getByRole("button", { name: "Close preview", exact: true }).click();
  await expect(opener).toBeFocused();
  await opener.click();
  await expect(dialog.getByLabel("Email address", { exact: true })).toHaveValue("");
  expect(writes).toEqual([]);
});

test("keyboard navigation and responsive panels", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation", exact: true });
  if (await menu.isVisible()) {
    await menu.click();
    await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link").first().focus();
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute("aria-expanded", "false");
  }
  await page.getByRole("button", { name: "Explore a sample", exact: true }).click();
  const opener = page.getByRole("button", { name: "View evidence", exact: true });
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("tab", { name: "Overview", exact: true })).toBeVisible();
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  const bounds = await dialog.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  for (const audience of [/Industrial Park Boards/, /EHS & Plant Managers/]) {
    await page.getByRole("tab", { name: audience }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("failed dialog download preserves the page and offers a working reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore a sample", exact: true }).click();
  const opener = page.getByRole("button", { name: "View evidence", exact: true });
  const scripts = "**/_next/static/chunks/*.js";
  // Install the fault after hydration so only the on-demand dialog download fails.
  await page.route(scripts, (route) => route.abort("failed"));
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "This preview couldn’t load.", exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Close preview", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Verify, not just trust.", exact: true })).toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await expect(dialog.getByRole("button", { name: "Reload page", exact: true })).toBeVisible();
  await page.unroute(scripts);
  await Promise.all([
    page.waitForEvent("load"),
    dialog.getByRole("button", { name: "Reload page", exact: true }).click(),
  ]);
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "Explore a sample", exact: true }).click();
  await page.getByRole("button", { name: "View evidence", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("tab", { name: "Overview", exact: true })).toBeVisible();
});
