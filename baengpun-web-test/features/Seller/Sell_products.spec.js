import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';

const username = 'sellproducts';
const password = '0123456789';
test.use({
    launchOptions: {
        slowMo: 100
    },
});


test('search for the desired product', async ({ page,context }) => {
    const page1 = await context.newPage();
    // const page2 = await context.newPage();
    await page.goto(serverUrl + '/login');
    await page.getByLabel('Qr Code Image').fill(username);
    await page.getByLabel('รหัสผ่าน *').fill(password);
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await page.waitForTimeout(1000);
    await page1.goto(serverUrl + '/my-account/community');
});
