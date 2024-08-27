import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';

test.use({
    launchOptions: {
        slowMo: 400
    },
});

test.describe('Check Page', () => {
    test('Home page', async ({ page }) => {
        await page.goto(serverUrl);
        await page.getByRole('link', { name: 'หน้าแรก' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น');
    });

    test.describe('navbarCollapse => My Account', () => {

        test('trolley', async ({ page }) => {
            await page.goto(serverUrl);
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

        test('Shipping and Returns', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
            await page.getByRole('link', { name: 'การจัดส่งสินค้าและการคืนสินค้า' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
        });

        test('My information', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
            await page.getByRole('link', { name: 'ข้อมูลของฉัน', exact: true }).click();
            await page.getByLabel('Qr Code Image').click();
            await page.getByLabel('Qr Code Image').fill('testing1');
            await page.getByLabel('รหัสผ่าน *').click();
            await page.getByLabel('รหัสผ่าน *').fill('123456789');
            await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
            await expect(page.getByRole('heading', { name: 'ข้อมูลของฉัน' })).toHaveText('ข้อมูลของฉัน');
        });

        test('My Orders', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
            await page.getByRole('link', { name: 'คำสั่งซื้อของฉัน' }).click();
            await page.getByLabel('Qr Code Image').click();
            await page.getByLabel('Qr Code Image').fill('testing1');
            await page.getByLabel('รหัสผ่าน *').click();
            await page.getByLabel('รหัสผ่าน *').fill('123456789');
            await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
            await expect(page.getByRole('heading', { name: 'คำสั่งซื้อของฉัน' })).toHaveText('คำสั่งซื้อของฉัน');
        });

        test('Change password', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
            await page.getByRole('link', { name: 'เปลี่ยนรหัสผ่าน' }).click();
            await page.getByLabel('Qr Code Image').click();
            await page.getByLabel('Qr Code Image').fill('testing1');
            await page.getByLabel('รหัสผ่าน *').click();
            await page.getByLabel('รหัสผ่าน *').fill('123456789');
            await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
            await expect(page.getByRole('heading', { name: 'เปลี่ยนรหัสผ่าน' })).toHaveText('เปลี่ยนรหัสผ่าน');
        });

        test('Favorites', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
            await page.getByRole('link', { name: 'รายการโปรด', exact: true }).click();
            await page.getByLabel('Qr Code Image').click();
            await page.getByLabel('Qr Code Image').fill('testing1');
            await page.getByLabel('รหัสผ่าน *').click();
            await page.getByLabel('รหัสผ่าน *').fill('123456789');
            await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
            await expect(page.getByRole('heading', { name: 'รายการโปรด' })).toHaveText('รายการโปรด');
        });

    });

    test.describe('navbarCollapse => About us', () => {

        test('Background from the navbarCollapse', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
            await page.locator('#navbarCollapse').getByRole('link', { name: 'ความเป็นมา' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: ความเป็นมา');
        });

        test('Contact us from the navbarCollapse', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
            await page.locator('#navbarCollapse').getByRole('link', { name: 'ติดต่อเรา' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
        });

        test('Our activities from the navbarCollapse', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
            await page.getByRole('link', { name: 'กิจกรรมของเรา' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: กิจกรรมของเรา');
        });

        test('Frequently asked questions from the navbarCollapse', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
            await page.locator('#navbarCollapse').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
        });
    });

    test.describe('topbarCollapse', () => {

        test('Shipping', async ({ page }) => {
            await page.goto(serverUrl);
            await page.locator('#topbarCollapse').getByRole('link', { name: 'การส่งสินค้า' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
        });

        test('Frequently asked questions', async ({ page }) => {
            await page.goto(serverUrl);
            await page.locator('#topbarCollapse').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
        });

        test('Contact us', async ({ page }) => {
            await page.goto(serverUrl);
            await page.locator('#topbarCollapse').getByRole('link', { name: 'ติดต่อเรา' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
        });

    });

    test('booklet from the navbarCollapse', async ({ page }) => {
        await page.goto(serverUrl);
        await page.getByRole('link', { name: 'จุลสาร' }).click();
        await expect(page).toHaveTitle('แบ่งปั๋น: กิจกรรมของเรา');
    });

    test.describe('footer => help', () => {

        test('Background', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'ความเป็นมา' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: ความเป็นมา');
        });

        test('Contact us', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('contentinfo').getByRole('link', { name: 'ติดต่อเรา' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
        });

        test('Frequently asked questions', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('contentinfo').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
        });

        test('Shipping', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('contentinfo').getByRole('link', { name: 'การส่งสินค้า' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
        });
    });

    test.describe('footer => type', () => {

        test('Background', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'ความเป็นมา' }).click();
            await expect(page).toHaveTitle('แบ่งปั๋น: ความเป็นมา');
        });

        test('Service work', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'งานบริการ' }).click();
            await expect(page).toHaveTitle('บริการ');
        });

        test('Products from the community', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'ผลิตภัณฑ์จากชุมชน' }).click();
            await expect(page).toHaveTitle('ผลิตภัณฑ์จากชุมชน');
        });

    });

    test.describe('footer => Community sharing shop', () => {

        test('Additional communities', async ({ page }) => {
            await page.goto(serverUrl);
            await page.getByRole('link', { name: 'ชุมชนเพิ่มเติม' }).click();
            await expect(page.locator('h3').filter({ hasText: 'ร้านค้าชุมชนแบ่งปั๋น' })).toHaveText('ร้านค้าชุมชนแบ่งปั๋น');
        });

    });
});