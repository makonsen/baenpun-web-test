import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://xn--72c0bbf4i0d4b1a.xn--o3cw4h/');
  await page.getByRole('link', { name: '' }).click();
  await page.getByPlaceholder('ค้นหา').click();
  await page.getByPlaceholder('ค้นหา').fill('ทดสอบ');
  await page.getByPlaceholder('ค้นหา').press('Enter');
  await page.locator('#navbarCollapse').getByRole('link', { name: 'หน้าแรก' }).click();
});

test('test2', async ({ page }) => {
  await page.goto('https://cloudshop.vclass.in.th/');
  await page.getByRole('link', { name: '' }).click();
  await page.getByPlaceholder('ค้นหา').click();
  await page.getByPlaceholder('ค้นหา').fill('mflv[');
  await page.getByPlaceholder('ค้นหา').press('ControlOrMeta+a');
  await page.getByPlaceholder('ค้นหา').fill('ทดสอบ');
  await page.getByRole('button', { name: '' }).click();
  // await page.goto('https://xn--72c0bbf4i0d4b1a.xn--o3cw4h/');
});