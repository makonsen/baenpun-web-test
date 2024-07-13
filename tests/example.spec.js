import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://cloudshop.vclass.in.th/');
  await page.getByRole('link', { name: 'เข้าสู่ระบบสำหรับสมาชิก' }).click();
  await page.getByLabel('Qr Code Image').click();
  await page.getByLabel('Qr Code Image').fill('นัทธี@คน.ไทย');
  await page.getByLabel('รหัสผ่าน *').click();
  await page.getByLabel('รหัสผ่าน *').fill('รหัส123456');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
  await page.getByRole('link', { name: 'จุลสาร' }).click();
  await page.getByRole('link', { name: 'อ่านเพิ่มเติม ' }).first().click();
  await page.locator('#navbarCollapse').getByRole('link', { name: 'หน้าแรก' }).click();
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('link', { name: '' }).click();
  await page.getByRole('link', { name: '' }).click();
  await page.locator('#topbarCollapse').getByRole('link', { name: 'การส่งสินค้า' }).click();
  await page.getByRole('link', { name: 'หน้าแรก' }).click();
});