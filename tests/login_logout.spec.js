import { test, expect } from '@playwright/test';

test('login and logout', async ({ page }) => {
  await page.goto('http://localhost/');
});