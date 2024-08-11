import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();

test.describe('New registration and login', () => {
    test('register',  async ({ page }) => {
        // ไปหน้าสมัครสมาชิก
        await page.goto('http://localhost/register');
        // ใส่ชื่อผู้ใช้
        await page.locator('#username').click();
        await page.locator('#username').fill('user_' + Dates);
        // ใส่ชื่อ นาม สกุล
        await page.getByLabel('ชื่อผู้ใช้').click();
        await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates);
        // ใส่อีเมล
        await page.getByLabel('อีเมล').click();
        await page.getByLabel('อีเมล').fill('makonsennatthi_' + Dates + '@gmail.com');
        // ใส่รหัสผ่าน
        await page.getByLabel('ตั้งรหัสผ่าน').click();
        await page.getByLabel('ตั้งรหัสผ่าน').fill('' + Dates);
        // ยืนยันรหัสผ่าน
        await page.getByLabel('ยืนยันรหัสผ่าน').click();
        await page.getByLabel('ยืนยันรหัสผ่าน').fill('' + Dates);
        // ใส่เบอร์
        await page.getByLabel('เบอร์โทรศัพท์').click();
        await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');
        await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    });

    test('login', async ({ page }) => {
        // ล็อคอิน
        await page.goto('http://localhost/login');
        // ใส่ชื่อผู้ใช้
        await page.getByLabel('Qr Code Image').click();
        await page.getByLabel('Qr Code Image').fill('user_' + Dates);
        // ใส่รหัสผ่าน
        await page.getByLabel('รหัสผ่าน *').click();
        await page.getByLabel('รหัสผ่าน *').fill('' + Dates);
        await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
        // ล็อคเอาค์
        await page.getByRole('link', { name: 'Baengpun' }).click();
        // await page.getByRole('button', { name: '' }).click();
    });
});