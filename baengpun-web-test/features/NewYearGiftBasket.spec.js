import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const email = 'makonsennatthi+' + Dates + '@gmail.com';
const password = '123456789';
const username = 'user_' + Dates;

test.use({
    launchOptions: {
        slowMo: 300
    },
});
test.describe('New Year Gift Basket', () => {

    test('Order before registering', async ({ page }) => {
        await page.goto(serverUrl);
        await page.getByRole('link', { name: '🎁 บริการจัดของขวัญปีใหม่ 🎁' }).click();
        await page.getByRole('button', { name: 'Close' }).click();
        await page.getByRole('button', { name: '+' }).nth(1).click();
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
        await page.getByRole('button', { name: 'บันทึกที่อยู่' }).click()
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
        await page.getByRole('link', { name: 'ดูรายละเอียดคำสั่งซื้อ' }).click();
    });
});