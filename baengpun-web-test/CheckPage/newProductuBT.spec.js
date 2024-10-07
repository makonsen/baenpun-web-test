import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';

test('can press the new product button.', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByRole('link', { name: 'สินค้ายอดนิยม' }).click();
    await expect(page.getByRole('heading', { name: 'สินค้ายอดนิยม' })).toHaveText('สินค้ายอดนิยม');
});