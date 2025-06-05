import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';

test.use({
    launchOptions: {
        slowMo: 100
    },
});

test('search for the desired product', async ({ page }) => {
    await page.goto(serverUrl + '/product/'+ 3);
    await page.getByPlaceholder('หมายเหตุถึงผู้ขาย').click();
    await page.getByPlaceholder('หมายเหตุถึงผู้ขาย').fill('หมายเหตุ');
    await page.getByRole('button', { name: 'ใส่รถเข็น ' }).click();
    await page.getByText('เลือกสินค้า', { exact: true }).click();
    await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    await page.getByRole('button', { name: 'ลงทะเบียน / เข้าสู่ระบบ' }).click();
    await page.getByPlaceholder('ใส่อีเมล หรือชื่อผู้ใช้ *').click();
    await page.getByPlaceholder('ใส่อีเมล หรือชื่อผู้ใช้ *').fill('testing_user');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('0123456789');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await page.getByPlaceholder('ชื่อ').click();
    await page.getByPlaceholder('ชื่อ').fill('username');
    await page.getByPlaceholder('เบอร์โทรศัพท์').click();
    await page.getByPlaceholder('เบอร์โทรศัพท์').fill('0123456789');
    await page.getByPlaceholder('ที่อยู่').click();
    await page.getByPlaceholder('ที่อยู่').fill('1');
    await page.getByPlaceholder('ค้นหาจังหวัด').click();
    await page.getByText('กระบี่ / Krabi').click();
    await page.getByPlaceholder('ค้นหาเขต/อำเภอ').click();
    await page.getByText('คลองท่อม / Khlong Thom').click();
    await page.getByPlaceholder('ค้นหาแขวง/ตำบล หรือ เลขไปรษณีย์').click();
    await page.getByText('คลองท่อมเหนือ / Khlong Thom Nuea -').click();
    await page.getByRole('button', { name: 'บันทึกที่อยู่' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    await page.getByRole('link', { name: 'ดูรายละเอียดคำสั่งซื้อ' }).click();
});
