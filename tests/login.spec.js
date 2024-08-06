import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  test.setTimeout(1200000);
  await page.goto('http://localhost/');
  await page.getByRole('link', { name: 'เข้าสู่ระบบสำหรับสมาชิก' }).click();
  await page.getByLabel('Qr Code Image').click();
  await page.getByLabel('Qr Code Image').fill('นัทธี@คน.ไทย');
  await page.getByLabel('รหัสผ่าน *').click();
  await page.getByLabel('รหัสผ่าน *').fill('');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
});