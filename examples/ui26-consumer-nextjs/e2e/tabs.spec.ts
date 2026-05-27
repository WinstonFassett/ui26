import { expect, test } from "@playwright/test";

// ---------------------------------------------------------------------------
// 1. SSR sanity — JS enabled, both tabs components render
// ---------------------------------------------------------------------------
test.describe("SSR sanity (JS on)", () => {
  test("tabs-stateful renders with default Account panel visible", async ({ page }) => {
    await page.goto("/");

    const tabsStateful = page.getByTestId("tabs-stateful");
    await expect(tabsStateful).toBeVisible();

    // Default panel is Account (defaultValue="account")
    const accountPanel = tabsStateful.getByRole("tabpanel").filter({ hasText: "Manage your account." });
    await expect(accountPanel).toBeVisible();
  });

  test("tabs-progressive renders with default Preview panel visible", async ({ page }) => {
    await page.goto("/");

    const tabsProgressive = page.getByTestId("tabs-progressive");
    await expect(tabsProgressive).toBeVisible();

    // defaultIndex={0} → "Preview" tab is active
    const previewRadio = tabsProgressive.locator('input[type="radio"]').first();
    await expect(previewRadio).toBeChecked();
  });
});

// ---------------------------------------------------------------------------
// 2. Tabs stateful interaction — JS on
// ---------------------------------------------------------------------------
test.describe("Tabs stateful (JS on)", () => {
  test("clicking Password tab shows Password panel and hides Account panel", async ({ page }) => {
    await page.goto("/");

    const tabsStateful = page.getByTestId("tabs-stateful");

    // Initially Account panel is shown
    const accountPanel = tabsStateful.getByRole("tabpanel").filter({ hasText: "Manage your account." });
    await expect(accountPanel).toBeVisible();

    // Click Password tab
    const passwordTrigger = tabsStateful.getByRole("tab", { name: "Password" });
    await passwordTrigger.click();

    // Password panel should now be visible
    const passwordPanel = tabsStateful.getByRole("tabpanel").filter({ hasText: "Update your password." });
    await expect(passwordPanel).toBeVisible();

    // Account panel should be hidden (uses hidden attribute)
    await expect(accountPanel).toBeHidden();
  });
});

// ---------------------------------------------------------------------------
// 3. TabsProgressive interaction — JS on
// ---------------------------------------------------------------------------
test.describe("TabsProgressive (JS on)", () => {
  test("clicking Code tab checks the Code radio input", async ({ page }) => {
    await page.goto("/");

    const tabsProgressive = page.getByTestId("tabs-progressive");

    // Click "Code" label — this targets the radio input via htmlFor
    const codeLabel = tabsProgressive.getByRole("tab", { name: "Code" });
    await codeLabel.click();

    // The second radio (index 1 = Code) should now be checked
    const codeRadio = tabsProgressive.locator('input[type="radio"]').nth(1);
    await expect(codeRadio).toBeChecked();
  });
});

// ---------------------------------------------------------------------------
// 4. JS-disabled behavior
// ---------------------------------------------------------------------------
test.describe("JS disabled", () => {
  test("tabs-stateful still renders server-rendered default panel with JS off", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/");

    const tabsStateful = page.getByTestId("tabs-stateful");
    await expect(tabsStateful).toBeVisible();

    // The default panel HTML is server-rendered; Account panel should exist in DOM
    // (active state depends on hydration, but the element is present)
    const accountPanel = tabsStateful.getByRole("tabpanel").filter({ hasText: "Manage your account." });
    await expect(accountPanel).toBeAttached();

    await context.close();
  });

  test("TabsProgressive allows tab switching via label click with JS off (pure CSS)", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/");

    const tabsProgressive = page.getByTestId("tabs-progressive");

    // Preview radio should be checked by default (defaultChecked on first input)
    const previewRadio = tabsProgressive.locator('input[type="radio"]').first();
    await expect(previewRadio).toBeChecked();

    // Click "Code" label — no JS needed, just a label→radio click
    const codeLabel = tabsProgressive.getByRole("tab", { name: "Code" });
    await codeLabel.click();

    // Code radio (index 1) should now be checked — pure CSS/HTML, no JS required
    const codeRadio = tabsProgressive.locator('input[type="radio"]').nth(1);
    await expect(codeRadio).toBeChecked();

    await context.close();
  });
});
