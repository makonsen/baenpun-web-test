import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();
test.use({
    launchOptions: {
        slowMo: 500
    },
});
test.describe('New registration and login', () => {
    test('register', async ({ page }) => {
        const email = 'makonsennatthi_' + Dates + '@gmail.com';
        // ไปหน้าสมัครสมาชิก Go to the registration page
        await page.goto('http://localhost/register');
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
        await page.goto('http://localhost/scripts/verify-email-auto?email=' + email)
    });

    const new_password = (new Date()).getTime();
    test('Change personal information', async ({ page }) => {
        // ล็อคอิน Login
        await page.goto('http://localhost/login');
        await page.getByLabel('Qr Code Image').click();
        await page.getByLabel('Qr Code Image').fill('user_' + Dates);
        // ใส่รหัสผ่าน Enter password
        await page.getByLabel('รหัสผ่าน *').click();
        await page.getByLabel('รหัสผ่าน *').fill('' + Dates);
        await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();

        // เปลี่ยนรหัสผ่าน
        await page.getByRole('link', { name: 'Baengpun' }).click();
        await page.getByRole('link', { name: '' }).click();
        await page.getByRole('button', { name: 'Close' }).click();
        // รหัสเดิม
        await page.getByRole('link', { name: ' แก้ไขรหัสผ่าน ' }).click();
        await page.locator('input[name="password"]').click();
        await page.locator('input[name="password"]').fill('' + Dates);
        await page.getByRole('button', { name: '' }).first().click();
        // รหัสใหม่
        await page.locator('input[name="new_password"]').click();
        await page.locator('input[name="new_password"]').fill('' + new_password);
        await page.getByRole('button', { name: '' }).first().click();
        // ยืนยันรหัสใหม่
        await page.locator('input[name="confirm_password"]').click();
        await page.locator('input[name="confirm_password"]').fill('' + new_password);
        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: 'ตกลง' }).click();

        // เปลี่ยนข้อมูลอื่นๆ
        await page.getByRole('link', { name: ' ข้อมูลของฉัน ' }).click();
        // ชื่อผู้ใช้
        await page.getByLabel('ชื่อผู้ใช้').click();
        await page.getByLabel('ชื่อผู้ใช้').fill('user_'+ new_password);
        // ชื่อนามสกุล
        await page.getByLabel('ชื่อ-นามสกุล').click();
        await page.getByLabel('ชื่อ-นามสกุล').fill('มกรเสน  user_' + new_password);
        // อีเมลล์
        await page.getByLabel('อีเมล').click();
        await page.getByLabel('อีเมล').fill('makonsennatthi_' + new_password + '@gmail.com');
        // ใส่รหัสยืนยัน
        await page.getByLabel('กรุณาใส่รหัสผ่านเพื่อแก้ไขข้อมูลส่วนตัว').click();
        await page.getByLabel('กรุณาใส่รหัสผ่านเพื่อแก้ไขข้อมูลส่วนตัว').fill('' + new_password);
        await page.getByRole('button', { name: 'บันทึก' }).click();
    });
    
    test('Log in with a new password', async ({ page }) => {
        // ล็อคอิน Login
        await page.goto('http://localhost/login');
        await page.getByLabel('Qr Code Image').click();
        await page.getByLabel('Qr Code Image').fill('user_' + new_password);
        // ใส่รหัสผ่าน Enter password
        await page.getByLabel('รหัสผ่าน *').click();
        await page.getByLabel('รหัสผ่าน *').fill('' + new_password);
        await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
        // ตรวจสอบค่าต่างๆ
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: '' }).click();
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.getByRole('link', { name: 'บัญชีของฉัน (มกรเสน' })).toHaveText('บัญชีของฉัน (มกรเสน  user_' + new_password + ')');
        await expect(page.getByLabel('ชื่อผู้ใช้')).toHaveValue('user_' + new_password);
        await expect(page.getByLabel('ชื่อ-นามสกุล')).toHaveValue('มกรเสน  user_' + new_password);
        await expect(page.getByLabel('อีเมล')).toHaveValue('makonsennatthi_' + new_password + '@gmail.com');
        // await expect(page.getByRole('link', { name: 'บัญชีของฉัน (มกรเสน' })).toHaveText('บัญชีของฉัน (มกรเสน  user_' + new_password + ')');
    }); 
});