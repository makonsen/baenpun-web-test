import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost/');
    await expect(page.getByRole('link', { name: 'บัญชีของฉัน (มกรเสน' })).toHaveText('ข้อความที่คุณคาดหวัง');
    await page.getByRole('link', { name: 'เข้าสู่ระบบสำหรับสมาชิก' }).click();
});