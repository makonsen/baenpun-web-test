import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
    // ถ้าสร้างแล้วให้ข้ามส่วนนี้
        // สมัครผู้ใช้งานทดสอบ
        // ไปหน้าสมัคร
        // ใส่ชื่่อผู้ใช้
        // ใส่ชื่อและนามสกุล
        // ใส่อีเมล์
        // ใส่รหัสผ่าน
        // ยืนยันรหัสผ่าน
        // ใส่เบอร์
        // ยืนยันอีเมลล์
    // ล็อคอินด้วยแอคเค้่าผู้ใช้งานทดสอบ
    // ใส่ชื่อ
    // ใส่รหัสผ่าน
    await page.goto('http://localhost/login');
    await page.getByLabel('Qr Code Image').click();
    await page.getByLabel('Qr Code Image').fill('user_1723564698171');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('1723564698171');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
});