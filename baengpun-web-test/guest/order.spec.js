import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
const username = 'user_' + Dates;
const email = 'test' + Dates + '@email.com';
const productTestID = process.env.PRODUCT_TEST_ID || '1';
const SLOW_MO = process.env.SLOW_MO || 500;

test.use({
    launchOptions: {
        slowMo: SLOW_MO
    },
});

test('Order as a guest', async ({ page }) => {
    await page.goto(serverUrl + '/product/' + productTestID);
    await page.getByRole('button', { name: 'ใส่รถเข็น ' }).click();
    await page.getByText('เลือกสินค้า', { exact: true }).click();
    await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    await page.getByRole('button', { name: 'ชำระเงินโดยไม่เป็นสมาชิก' }).click();
    await page.getByPlaceholder('ชื่อ').fill(username);
    await page.getByPlaceholder('อีเมล', { exact: true }).fill(email);
    await page.getByPlaceholder('เบอร์โทรศัพท์').fill('0123456789');
    await page.getByPlaceholder('ที่อยู่').fill('ที่อยู่');
    await page.getByPlaceholder('ค้นหาจังหวัด').click();
    await page.getByText('กรุงเทพมหานคร / Bangkok').click();
    await page.getByPlaceholder('ค้นหาเขต/อำเภอ').click();
    await page.getByText('เขตคลองสาน / Khet Khlong San').click();
    await page.getByPlaceholder('ค้นหาแขวง/ตำบล หรือ เลขไปรษณีย์').click();
    await page.getByText('คลองต้นไทร / Khlong Ton Sai -').click();
    await page.getByRole('button', { name: 'บันทึกที่อยู่' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    await page.getByRole('link', { name: 'ดูรายละเอียดคำสั่งซื้อ' }).click();
});