import { expect, test } from "@playwright/test";

test("Button from ui26 registry renders with resolved tokens", async ({ page }) => {
  await page.goto("/");
  const button = page.getByTestId("hello");
  await expect(button).toBeVisible();
  await expect(button).toHaveText("Hello ui26");

  const bg = await button.evaluate((el) =>
    window.getComputedStyle(el).backgroundColor,
  );
  // Proves tokens.css merged and Tailwind resolved bg-primary → var(--primary) → oklch(...)
  expect(bg).not.toBe("rgba(0, 0, 0, 0)");
  expect(bg).not.toBe("transparent");
  expect(bg).not.toBe("");
});
