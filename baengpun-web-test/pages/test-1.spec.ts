import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  test('Products from the community', async ({ page }) => {
    await page.goto('http://localhost/all?category=&keyword=');
    await page.getByRole('link', { name: 'ผลิตภัณฑ์จากชุมชน' }).first().click();
    await expect(page).toHaveTitle('ผลิตภัณฑ์จากชุมชน');
});

test('Handicraft', async ({ page }) => {
    await page.goto('http://localhost/all?category=&keyword=');
    await page.getByRole('link', { name: 'งานฝีมือ' }).first().click();
    await expect(page).toHaveTitle('งานฝีมือ');
});

test('Services', async ({ page }) => {
    await page.goto('http://localhost/all?category=&keyword=');
    await page.getByRole('link', { name: 'งานบริการ' }).first().click();
    await expect(page).toHaveTitle('งานบริการ');
});
});