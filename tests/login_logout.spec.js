import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost/');
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByRole('link', { name: 'ผลิตภัณฑ์จากชุมชน' }).first().click();
  await page.getByRole('link', { name: 'OOlong Tea' }).first().click();
});