import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByRole('link', { name: 'เข้าสู่ระบบสำหรับสมาชิก' }).click();
    await page.getByLabel('Qr Code Image').click();
    await page.getByLabel('Qr Code Image').fill('user_1723477894195');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('1723477894195');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await page.getByRole('link', { name: '' }).click();
    
});