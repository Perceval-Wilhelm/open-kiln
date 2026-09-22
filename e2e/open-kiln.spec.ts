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
  page.on("requestfailed", (request) => errors.push(`Request failed: ${request.url()}`));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`);
  });
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Verify, not just trust.", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Use a record ID", exact: true }).click();
  await expect(page.getByLabel("Manifest ID", { exact: true })).toBeFocused();
  await page.getByLabel("Manifest ID", { exact: true }).fill(" ok-2026-0144 ");
  await page.getByRole("button", { name: "Verify record", exact: true }).click();
  const opener = page.getByRole("button", { name: /^View evidence for/ });
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
  const dashboard = page.getByLabel("Park governance dashboard");
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
  await dialog.getByRole("button", { name: "Review request", exact: true }).click();
  await expect(dialog.getByLabel("Your name", { exact: true })).toHaveAccessibleDescription("Enter your name.");
  await expect(dialog.getByLabel("Your name", { exact: true })).toBeFocused();
  await assertDescriptionsExist(page);
  await dialog.getByRole("button", { name: "Use example details", exact: true }).click();
  await dialog.getByRole("button", { name: "Review request", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("Your request summary is ready.");
  await expect(dialog.getByRole("status")).toContainText("Alex Nguyen");
  await expect(dialog.getByRole("status")).toContainText("monitoring scope");
  await dialog.getByRole("button", { name: "Edit draft", exact: true }).click();
  await expect(dialog.getByLabel("Your name", { exact: true })).toHaveValue("Alex Nguyen");
  await dialog.getByLabel("Your name", { exact: true }).fill("Alex Nguyen Lee");
  await dialog.getByRole("button", { name: "Review request", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("Alex Nguyen Lee");
  await dialog.getByRole("button", { name: "Close summary", exact: true }).click();
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
  await page.getByRole("button", { name: "Use a record ID", exact: true }).click();
  const opener = page.getByRole("button", { name: /^View evidence for/ });
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
  await dialog.getByRole("tab", { name: "Evidence", exact: true }).click();
  await dialog.getByRole("button", { name: "How the evidence is produced", exact: true }).focus();
  const closeBounds = await dialog.getByRole("button", { name: "Close", exact: true }).boundingBox();
  expect(closeBounds!.y).toBeGreaterThanOrEqual(0);
  expect(closeBounds!.y + closeBounds!.height).toBeLessThanOrEqual(page.viewportSize()!.height);
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  for (const audience of [/Industrial Park Boards/, /EHS & Plant Managers/]) {
    await page.getByRole("tab", { name: audience }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("failed dialog download preserves the page and offers a working reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Use a record ID", exact: true }).click();
  const opener = page.getByRole("button", { name: /^View evidence for/ });
  const scripts = "**/_next/static/chunks/*.js";
  // Install the fault after hydration so only the on-demand dialog download fails.
  await page.route(scripts, (route) => route.abort("failed"));
  await opener.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "This content couldn’t load.", exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Close", exact: true }).first().click();
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
  await page.getByRole("button", { name: "Use a record ID", exact: true }).click();
  await page.getByRole("button", { name: /^View evidence for/ }).click();
  await expect(page.getByRole("dialog").getByRole("tab", { name: "Overview", exact: true })).toBeVisible();
});

test("register pagination, filters, sorting and three search modes", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator(".ok-register-card");
  await expect(cards).toHaveCount(6);
  const firstPage = await cards.locator(".ok-mono").allTextContents();
  await page.getByRole("button", { name: "Next records page", exact: true }).click();
  await expect(page.locator(".ok-register-results-head")).toBeFocused();
  const secondPage = await cards.locator(".ok-mono").allTextContents();
  expect(secondPage.some((id) => firstPage.includes(id))).toBe(false);
  await page.getByLabel("Treatment status filter", { exact: true }).selectOption("Processing");
  await expect(cards).toHaveCount(5);
  await expect(page.getByRole("button", { name: "Previous records page", exact: true })).toBeDisabled();
  await page.getByLabel("Evidence availability filter", { exact: true }).selectOption("Complete");
  await expect(page.getByRole("heading", { name: "No matching records", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Explore the register", exact: true }).click();
  await expect(page.getByLabel("Manifest ID", { exact: true })).toBeFocused();
  await page.getByLabel("Sort records", { exact: true }).selectOption("quantity");
  await expect(cards.first()).toContainText("OK-2026-0164");
  await page.getByLabel("Search by", { exact: true }).selectOption("generator");
  await page.getByLabel("Generator name", { exact: true }).fill("  MEKONG precision ");
  await page.getByRole("button", { name: "Verify record", exact: true }).click();
  await expect(cards).toHaveCount(4);
  await page.getByLabel("Search by", { exact: true }).selectOption("date");
  await page.getByLabel("Treatment date", { exact: true }).fill("2026-09-18");
  await page.getByRole("button", { name: "Verify record", exact: true }).click();
  await expect(cards).toHaveCount(2);
  await expect(cards).toContainText(["OK-2026-0142", "OK-2026-0145"]);
  await page.getByLabel("Search by", { exact: true }).selectOption("manifest");
  await page.getByLabel("Manifest ID", { exact: true }).fill("OK-2026");
  await page.getByRole("button", { name: "Verify record", exact: true }).click();
  await expect(cards).toHaveCount(0);
});

test("library service entry points, source filters and every resource", async ({ page }) => {
  await page.goto("/");
  const library = page.locator("#library");
  await library.getByRole("button", { name: /EXPLORE THE REGISTER ESG Dashboard/ }).click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "Your evidence overview", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("button", { name: /^Open record/ })).toHaveCount(24);
  await page.getByRole("dialog").getByRole("button", { name: "Open record OK-2026-0142", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Read our transparency statement", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator("#transparency")).toBeFocused();
  await library.getByRole("button", { name: /TAKE THE NEXT STEP ESG Data Request Portal/ }).click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "Request supporting evidence", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByLabel("Source", { exact: true }).selectOption("Public");
  await expect(library.locator(".ok-resource-card")).toHaveCount(6);
  await page.getByLabel("Source", { exact: true }).selectOption("All");
  await library.getByRole("button", { name: /Show more resources/ }).click();
  await library.getByRole("button", { name: /Show more resources/ }).click();
  await expect(library.locator(".ok-resource-card")).toHaveCount(16);
  const resourceCards = library.locator(".ok-resource-card");
  for (let index = 0; index < (await resourceCards.count()); index++) {
    const title = await resourceCards.nth(index).locator("h3").innerText();
    await resourceCards.nth(index).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: title, exact: true })).toBeVisible();
    await expect(page.getByRole("dialog").locator(".ok-reading section").first()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(resourceCards.nth(index)).toBeFocused();
  }
});

test("process stages and evidence-issue follow-up keep their context", async ({ page }) => {
  await page.goto("/");
  const stages = page.getByRole("tablist", { name: "Explore the co-processing stages" });
  await stages.getByRole("tab", { name: "01 Receive", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Identity before treatment.", exact: true })).toBeVisible();
  await stages.getByRole("tab", { name: "01 Receive", exact: true }).press("ArrowRight");
  await expect(stages.getByRole("tab", { name: "02 Co-process", exact: true })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await page.getByRole("tab", { name: /Industrial Park Boards/ }).click();
  const dashboard = page.getByLabel("Park governance dashboard");
  await expect(dashboard).toContainText("up 0.7 percentage points from Q1");
  await expect(dashboard.locator(".ok-issue-item")).toHaveCount(3);
  await dashboard.getByRole("button", { name: "Follow up on Monitoring summary outstanding", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Q2 2026 · Monitoring summary outstanding · 7 records");
  await page.keyboard.press("Escape");
  await page.getByLabel("Reporting period").selectOption("Q1");
  await expect(dashboard).toContainText("baseline period for comparison");
  await expect(dashboard.locator(".ok-issue-item").first()).toContainText("6");
});

test("all engagement requests stay local and expose an honest review state", async ({ page }) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(request.url());
  });
  await page.goto("/");
  for (const name of ["Monthly Email Updates", "Explore the EHS roundtable", "Explore governance roundtable"]) {
    await page.getByRole("button", { name, exact: true }).click();
    const dialog = page.getByRole("dialog");
    await dialog.getByRole("button", { name: "Use example details", exact: true }).click();
    await dialog
      .getByRole("button", {
        name: name === "Monthly Email Updates" ? "Review subscription" : "Review request",
        exact: true,
      })
      .click();
    await expect(dialog.getByRole("status")).toContainText("No request has been sent.");
    await expect(dialog.getByRole("link", { name: /Official INSEE contact/ })).toHaveAttribute(
      "href",
      "https://www.siamcitycement.com/vietnam/en/insee-ecocycle/contact",
    );
    await page.keyboard.press("Escape");
  }
  await page.getByRole("tab", { name: /Industrial Park Boards/ }).click();
  await page.getByRole("button", { name: "Follow-up Meetings", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Use example details", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Review request", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText("No request has been sent.");
  expect(writes).toEqual([]);
});

test("reduced motion and server-rendered content", async ({ page, browser }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noScript = await context.newPage();
  await noScript.goto(page.url());
  await expect(noScript.getByRole("heading", { name: "Verify, not just trust.", exact: true })).toBeVisible();
  await expect(noScript.getByRole("heading", { name: "Real research. Read in context.", exact: true })).toBeVisible();
  await expect(noScript.locator(".ok-register-card")).toHaveCount(6);
  await expect(noScript.locator("#transparency")).toContainText("illustrative");
  await context.close();
  const missingPage = await page.goto("/missing-record-page");
  expect(missingPage?.status()).toBe(404);
  await page.getByRole("link", { name: "Back to Open Kiln", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Verify, not just trust.", exact: true })).toBeVisible();
});

test("visual review artifacts, text contrast and viewport fit", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({ path: `output/playwright/${testInfo.project.name}-hero.png` });
  for (const audience of [/EHS & Plant Managers/, /Industrial Park Boards/]) {
    await page.getByRole("tab", { name: audience }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const smallButtons = await page
      .locator(".ok-site button:visible")
      .evaluateAll((buttons) =>
        buttons.filter((button) => button.getBoundingClientRect().height < 43.5).map((button) => button.textContent),
      );
    expect(smallButtons).toEqual([]);
    const contrastFailures = await page.locator(".ok-site").evaluate((root) => {
      const rgb = (value: string) => (/^rgba?\(/.test(value) ? value.match(/[\d.]+/g)!.map(Number) : null);
      const luminance = (colour: number[]) =>
        colour
          .slice(0, 3)
          .map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          })
          .reduce((total, value, index) => total + value * [0.2126, 0.7152, 0.0722][index], 0);
      const failures: Array<{ text: string; ratio: number }> = [];
      for (const element of root.querySelectorAll("*")) {
        if (
          !element.getClientRects().length ||
          !Array.from(element.childNodes).some((node) => node.nodeType === 3 && node.textContent?.trim())
        )
          continue;
        const style = getComputedStyle(element);
        if (style.visibility === "hidden" || Number(style.opacity) < 1) continue;
        const foreground = rgb(style.color);
        if (!foreground || (foreground.length > 3 && foreground[3] < 1)) continue;
        let ancestor: Element | null = element;
        let background: number[] = [255, 255, 255];
        let skip = false;
        while (ancestor) {
          const ancestorStyle = getComputedStyle(ancestor);
          // Gradient/alpha compositing needs a separate visual review, not a guessed colour.
          if (ancestorStyle.backgroundImage !== "none" || Number(ancestorStyle.opacity) < 1) {
            skip = true;
            break;
          }
          const colour = rgb(ancestorStyle.backgroundColor);
          if (colour && (colour.length === 3 || colour[3] === 1)) {
            background = colour;
            break;
          }
          ancestor = ancestor.parentElement;
        }
        if (skip) continue;
        const a = luminance(foreground),
          b = luminance(background);
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        const size = Number.parseFloat(style.fontSize);
        const threshold = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700) ? 3 : 4.5;
        if (ratio < threshold) failures.push({ text: element.textContent!.trim().slice(0, 100), ratio });
      }
      return failures;
    });
    expect(contrastFailures).toEqual([]);
  }
  // Region screenshots extend beyond the viewport: hide floating chrome only in
  // these artifacts so it is not stitched over the middle of a long section.
  const regionStyle = ".ok-header, .ok-skip-link { visibility: hidden !important; }";
  await page.locator(".ok-process-explorer").screenshot({
    path: `output/playwright/${testInfo.project.name}-process.png`,
    style: regionStyle,
  });
  await page
    .getByLabel("Park governance dashboard")
    .screenshot({ path: `output/playwright/${testInfo.project.name}-governance.png`, style: regionStyle });
  await page
    .locator("#verify")
    .screenshot({ path: `output/playwright/${testInfo.project.name}-register.png`, style: regionStyle });
});
