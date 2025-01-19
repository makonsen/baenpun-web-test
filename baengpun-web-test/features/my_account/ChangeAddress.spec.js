import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
const email = 'makonsennatthi_' + Dates + '@gmail.com';
const password = 'รหัส' + Dates;
const symbol = ['@', '+', '*', '/', '+-', '.', '!', '\'', '#', '$'];

test.use({
    launchOptions: {
        slowMo: 500
    },
});

test('Correct value', async ({ page }) => {
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill('user_' + Dates);// ใส่ชื่อผู้ใช้ Enter username
    await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates);// ใส่ชื่อ นาม สกุล Enter your first and last name
    await page.getByLabel('อีเมล').fill(email);// ใส่อีเมล Enter email
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);// ยืนยันรหัสผ่าน Confirm password
    await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');// ใส่เบอร์ Enter number
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();

    // ยืนยันบัญชี Verify Account
    await page.goto(serverUrl + '/scripts/verify-email-auto?email=' + email);
    
    // ล็อคอิน Login
    await page.goto(serverUrl + '/login');
    await page.getByLabel('Qr Code Image').fill('user_' + Dates);

    // ใส่รหัสผ่าน Enter password
    await page.getByLabel('รหัสผ่าน *').fill(password);
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await page.getByRole('link', { name: 'Baengpun' }).click();

    // ตรวจสอบค่าต่างๆ
    await page.goto(serverUrl);
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('link', { name: 'บัญชีของฉัน (มกรเสน' })).toHaveText('บัญชีของฉัน (มกรเสน  user_' + Dates + ')');
    await expect(page.getByLabel('ชื่อผู้ใช้')).toHaveValue('user_' + Dates);
    await expect(page.getByLabel('ชื่อ-นามสกุล')).toHaveValue('มกรเสน  user_' + Dates);
    await expect(page.getByLabel('อีเมล')).toHaveValue('makonsennatthi_' + Dates + '@gmail.com');
});