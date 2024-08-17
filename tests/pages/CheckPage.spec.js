import { test, expect } from '@playwright/test';
test.describe('Test the pages to see if they are on the right page.', () => {
    test('Shipping', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.locator('#topbarCollapse').getByRole('link', { name: 'การส่งสินค้า' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
    });

    test('Frequently asked questions', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.locator('#topbarCollapse').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
    });

    test('Contact us', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.locator('#topbarCollapse').getByRole('link', { name: 'ติดต่อเรา' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
    });

    test('Background from the navbarCollapse', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
        await page.locator('#navbarCollapse').getByRole('link', { name: 'ความเป็นมา' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: ความเป็นมา');
    });

    test('trolley', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
        await page.getByRole('link', { name: 'รถเข็น' }).click();
        await page.getByLabel('Qr Code Image').click();
        await page.getByLabel('Qr Code Image').fill('testing1');
        await page.getByLabel('รหัสผ่าน *').click();
        await page.getByLabel('รหัสผ่าน *').fill('123456789');
        await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
        await page.getByRole('link', { name: 'ตรวจสอบรายการสินค้า' }).click();
        await expect(page).toHaveTitle('ทั้งหมด');
    });
    // test('', async ({ page }) => {

    // });

    test('Shipping and Returns', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
        await page.getByRole('link', { name: 'การจัดส่งสินค้าและการคืนสินค้า' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
    });

    test('Contact us from the navbarCollapse', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
        await page.locator('#navbarCollapse').getByRole('link', { name: 'ติดต่อเรา' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
    });

    test('Our activities from the navbarCollapse', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
        await page.getByRole('link', { name: 'กิจกรรมของเรา' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: กิจกรรมของเรา');
    });

    test('Frequently asked questions from the navbarCollapse', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
        await page.locator('#navbarCollapse').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
    });

    test('booklet from the navbarCollapse', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'จุลสาร' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: กิจกรรมของเรา');
    });

    test('Home page', async ({ page }) => {
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: 'หน้าแรก' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น');
    });

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