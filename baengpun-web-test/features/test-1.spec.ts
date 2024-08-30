import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();
const serverUrl = process.env.SERVER_URL || 'http://localhost';
test('test', async ({ page }) => {
  const email = 'makonsennatthi_' + Dates + '@gmail.com';
  await page.goto(serverUrl);
  await page.getByPlaceholder('กรอกอีเมล *').click();
  await page.getByPlaceholder('กรอกอีเมล *').fill(email);
  await page.getByRole('button', { name: 'ติดตาม' }).click();
  await expect(page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' })).toHaveText('ติดตามรับข่าวสารเรียบร้อยแล้ว');
  await page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
});