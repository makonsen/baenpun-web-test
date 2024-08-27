import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();
const serverUrl = process.env.SERVER_URL || 'http://localhost';
test.use({
    launchOptions: {
        slowMo: 500
    },
});
test.describe('New registration and login', () => {
    test('register', async ({ page }) => {
        const email = 'makonsennatthi_' + Dates + '@gmail.com';
        // ไปหน้าสมัครสมาชิก Go to the registration page
        await page.goto(serverUrl + '/register'); 
        // ใส่ชื่อผู้ใช้ Enter username
        await page.locator('#username').click();
        await page.locator('#username').fill('user_' + Dates);
        // ใส่ชื่อ นาม สกุล Enter your first and last name
        await page.getByLabel('ชื่อผู้ใช้').click();
        await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates);
        // ใส่อีเมล Enter email
        await page.getByLabel('อีเมล').click();
        await page.getByLabel('อีเมล').fill(email);
        // ใส่รหัสผ่าน Enter password
        await page.getByLabel('ตั้งรหัสผ่าน').click();
        await page.getByLabel('ตั้งรหัสผ่าน').fill('' + Dates);
        // ยืนยันรหัสผ่าน Confirm password
        await page.getByLabel('ยืนยันรหัสผ่าน').click();
        await page.getByLabel('ยืนยันรหัสผ่าน').fill('' + Dates);
        // ใส่เบอร์ Enter number
        await page.getByLabel('เบอร์โทรศัพท์').click();
        await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');
        await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
        // ยืนยันบัญชี Verify Account
        await page.goto(serverUrl + '/scripts/verify-email-auto?email=' + email);
    });

    test('Log in with the newly created user.', async ({ page }) => {
        // ล็อคอิน Login
        await page.goto(serverUrl + '/login'); 
        await page.getByLabel('Qr Code Image').click();
        await page.getByLabel('Qr Code Image').fill('user_' + Dates);
        // ใส่รหัสผ่าน Enter password
        await page.getByLabel('รหัสผ่าน *').click();
        await page.getByLabel('รหัสผ่าน *').fill('' + Dates);
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
});