import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const categoriesData = [
    { search: 'COMMUNITYPRODUCTS', expects: 'ผลิตภัณฑ์จากชุมชน' },
    { search: 'HANDICRAFT', expects: 'งานฝีมือ' },
    { search: 'SERVICES', expects: 'งานบริการ' },
]
test('search for the desired product', async ({ page }) => {
    await page.goto(serverUrl);
});

categoriesData.forEach(({ search, expects }) => {
    test(`Product categories are ${search}`, async ({ page }) => {
        await page.goto(serverUrl);
        await page.getByRole('link', { name: '' }).click();
        await page.getByLabel('ค้นหาสินค้า:').selectOption(search);
        await page.getByRole('button', { name: '' }).click();
        await expect(page.getByRole('heading', { name: expects })).toHaveText(expects);
    });
});

test.describe('choose the product type', () => {
    test('all', async ({ page }) => {
        await page.goto(serverUrl + '/all?category=&keyword=');
        await page.getByRole('link', { name: 'ทั้งหมด' }).click();
        await expect(page).toHaveTitle('ทั้งหมด');
    });

    test('Products from the community', async ({ page }) => {
        await page.goto(serverUrl + '/all?category=&keyword=');
        await page.locator('a').filter({ hasText: /^ผลิตภัณฑ์จากชุมชน$/ }).nth(1).click();
        await expect(page).toHaveTitle('ผลิตภัณฑ์จากชุมชน');
    });

    test('Handicraft', async ({ page }) => {
        await page.goto(serverUrl + '/all?category=&keyword=');
        await page.getByRole('link', { name: 'งานฝีมือ' }).first().click();
        await expect(page).toHaveTitle('งานฝีมือ');
    });

    test('Service work', async ({ page }) => {
        await page.goto(serverUrl + '/all?category=&keyword=');
        await page.getByRole('link', { name: 'งานบริการ' }).first().click();
        await expect(page).toHaveTitle('งานบริการ');
    });
});

test('specify the price range', async ({ page }) => {
    await page.goto(serverUrl);
});