import { test, expect } from '@playwright/test';

test('new location', async ({ page }) => {
    await page.goto('https://cloudshop.vclass.in.th/');
    await page.getByRole('link', { name: 'เข้าสู่ระบบสำหรับสมาชิก' }).click();
    await page.getByLabel('Qr Code Image').click();
    await page.getByLabel('Qr Code Image').fill('นัทธี@คน.ไทย');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('รหัส123456');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await page.getByRole('link', { name: '' }).click();
    //   for (let i = 0; i < 5; i++) {
    await page.getByRole('link', { name: ' ที่อยู่ ' }).click();
    await page.getByRole('link', { name: 'เพิ่มที่อยู่ใหม่ ' }).click();
    await page.getByLabel('ชื่อที่อยู่').click();
    await page.getByLabel('ชื่อที่อยู่').fill('1');
    await page.getByLabel('ชื่อ-นามสกุล').click();
    await page.getByLabel('ชื่อ-นามสกุล').fill('นัทธี มกรเสน');
    await page.getByLabel('เบอร์โทรศัพท์').click();
    await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');
    await page.getByLabel('ที่อยู่', { exact: true }).click();
    await page.getByLabel('ที่อยู่', { exact: true }).fill('1');
    await page.getByPlaceholder('ค้นหาจังหวัด').click();
    await page.locator('div').filter({ hasText: /^ตาก \/ Tak$/ }).first().click();
    await page.getByPlaceholder('ค้นหาเขต/อำเภอ').click();
    await page.getByText('พบพระ / Phop Phra').click();
    await page.getByPlaceholder('ค้นหาแขวง/ตำบล หรือ เลขไปรษณีย์').click();
    await page.getByText('ช่องแคบ / Chong Khaep -').click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('link', { name: ' ที่อยู่ ' }).click();
    await expect(page).toHaveTitle(/แบ่งปั๋น/);
    //   }
});