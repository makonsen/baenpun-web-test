import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const categories_Data = [
    { search: 'COMMUNITYPRODUCTS', expects: 'ผลิตภัณฑ์จากชุมชน' },
    { search: 'HANDICRAFT', expects: 'งานฝีมือ' },
    { search: 'SERVICES', expects: 'งานบริการ' },
]
const price_Range_Data = [
    { pricemin: '100', pricmax: '200', expects: '100 บาท - 200 บาท' },
    { pricemin: '1000', pricmax: '2000', expects: '1,000 บาท - 2,000 บาท' },
    { pricemin: '100', pricmax: '20', expects: '100 บาท - 20 บาท' },
];
const price_choices = [
    { choices: 'ต่ำกว่า 500 บาท', expects: 'ต่ำกว่า 500 บาท' },
    { choices: '- 1,000 บาท', expects: '500 บาท - 1,000 บาท' },
    { choices: '- 2,000 บาท', expects: '1,000 บาท - 2,000 บาท' },
    { choices: 'มากกว่า 2,000 บาท', expects: ' มากกว่า 2,000 บาท' },
];

test('search for the desired product', async ({ page }) => {
    await page.goto(serverUrl);
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
        await expect(page).toHaveTitle('ผลิตภัณฑ์หัตถกรรม');
    });

    test('Service work', async ({ page }) => {
        await page.goto(serverUrl + '/all?category=&keyword=');
        await page.getByRole('link', { name: 'งานบริการ' }).first().click();
        await expect(page).toHaveTitle('บริการ');
    });
});

categories_Data.forEach(({ search, expects }) => {
    test(`Product categories are ${search}`, async ({ page }) => {
        await page.goto(serverUrl);
        await page.getByRole('link', { name: '' }).click();
        await page.getByLabel('ค้นหาสินค้า:').selectOption(search);
        await page.getByRole('button', { name: '' }).click();
        await expect(page.getByRole('heading', { name: expects })).toHaveText(expects);
    });
});

price_Range_Data.forEach(({ pricemin, pricmax, expects }) => {
    test(`specify the price range ${expects}`, async ({ page }) => {
        await page.goto(serverUrl);
        await page.locator('#searchCell_0').getByText('กำลังตามหาอะไรเป็นพิเศษหรือป่าว คลิ๊กเลย!!').click();
        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('link', { name: 'ราคา ' }).click();
        await page.getByText('กำหนดราคา').nth(1).click();
        await page.locator('#priceRangeSelector').getByPlaceholder('กำหนดราคาขั้นต่ำ').fill(pricemin);
        await page.locator('#priceRangeSelector').getByPlaceholder('กำหนดราคาสูงสุด').fill(pricmax);
        await page.getByRole('button', { name: 'ค้นหา' }).click();
        await expect(page.locator('.d-none > .row > .col-12')).toHaveText(expects);
    });
});

price_choices.forEach(({ choices, expects }) => {
    test(`specify the price range ${choices}`, async ({ page }) => {
        await page.goto(serverUrl);
        await page.locator('#searchCell_0').getByText('กำลังตามหาอะไรเป็นพิเศษหรือป่าว คลิ๊กเลย!!').click();
        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('link', { name: 'ราคา ' }).click();
        await page.getByText(choices).nth(1).click();
        await page.getByRole('button', { name: 'ค้นหา' }).click();
        await expect(page.locator('.d-none > .row > .col-12')).toHaveText(expects);
    });
});