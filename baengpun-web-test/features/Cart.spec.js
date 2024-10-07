import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const email = 'makonsennatthi_' + Dates + '@gmail.com';
const password = '123456789';

test.use({
    launchOptions: {
        slowMo: 500
    },
});
test.describe('registration', () => {

    test('Correct value', async ({ page }) => {
        // ล็อคอิน Login
        await page.goto(serverUrl + '/login');
        await page.getByLabel('Qr Code Image').fill('cart');
        await page.getByLabel('รหัสผ่าน *').fill(password);
        await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
        await page.getByRole('link', { name: 'Baengpun' }).click();

    });
});