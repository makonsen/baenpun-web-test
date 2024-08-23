import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();
const fs = require('fs');

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
        await page.goto('http://localhost/scripts/verify-email-auto?email='+email)
    });

    test('Log in with the newly created user.', async ({ page }) => {
        // ล็อคอิน Login
        await page.goto('http://localhost/login');
        await page.getByLabel('Qr Code Image').click();
        await page.getByLabel('Qr Code Image').fill('user_' + Dates);
        // ใส่รหัสผ่าน Enter password
        await page.getByLabel('รหัสผ่าน *').click();
        await page.getByLabel('รหัสผ่าน *').fill('' + Dates);
        await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
        await page.getByRole('link', { name: 'Baengpun' }).click();
        await page.goto('http://localhost/');
        await page.getByRole('link', { name: '' }).click();
    });
    // let details = 'let user_name = '+'user_'+Dates;
    // fs.writeFile('user/'+Dates+'.js', details, (err) => {
    //     if (err) throw err;
    // });
});