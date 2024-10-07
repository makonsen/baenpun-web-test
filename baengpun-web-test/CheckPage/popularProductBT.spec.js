import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';

test('can press the popular product button.', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByRole('link', { name: 'สินค้าใหม่' }).click();
    await expect(page.getByRole('heading', { name: 'สินค้าใหม่' })).toHaveText('สินค้าใหม่');
});