import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
    // ถ้าสร้างแล้วให้ข้ามส่วนนี้
        // สมัครผู้ใช้งานทดสอบ
        // ไปหน้าสมัคร
        // await page.goto('http://localhost/register');
        // ใส่ชื่่อผู้ใช้
        // await page.locator('#username').click();
        // await page.locator('#username').fill('testing1');
        // ใส่ชื่อและนามสกุล
        // await page.getByLabel('ชื่อผู้ใช้').click();
        // await page.getByLabel('ชื่อผู้ใช้').fill('test  ing');
        // ใส่อีเมล์
        // await page.getByLabel('อีเมล').click();
        // await page.getByLabel('อีเมล').fill('makonsennatthi_test@gmail.com');
        // ใส่รหัสผ่าน
        // await page.getByLabel('ตั้งรหัสผ่าน').click();
        // await page.getByLabel('ตั้งรหัสผ่าน').fill('123456789');
        // ยืนยันรหัสผ่าน
        // await page.getByLabel('ยืนยันรหัสผ่าน').click();
        // await page.getByLabel('ยืนยันรหัสผ่าน').fill('123456789');
        // ใส่เบอร์
        // ยืนยันอีเมลล์
        // await page.getByLabel('เบอร์โทรศัพท์').click();
        // await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');
        // await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    // ล็อคอินด้วยแอคเค้่าผู้ใช้งานทดสอบ
    // ใส่ชื่อ
    // ใส่รหัสผ่าน
    await page.goto('http://localhost/login');
    await page.getByLabel('Qr Code Image').click();
    await page.getByLabel('Qr Code Image').fill('testing1');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('123456789');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await expect(page).toHaveTitle('แบ่งปั๋น')
});