import { test, expect } from '@playwright/test';
const Dates = (new Date()).getTime();
const serverUrl = process.env.SERVER_URL || 'http://localhost';

test.describe('New registration and login', () => {

  test('Duplicate values', async ({ page }) => {
    await page.goto(serverUrl + '/login');
    await page.getByLabel('Qr Code Image').click();
    await page.getByLabel('Qr Code Image').fill('information');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('123456789');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    // login
    await page.getByRole('link', { name: '' }).click();
    await page.getByLabel('ชื่อผู้ใช้').click();
    await page.getByLabel('ชื่อผู้ใช้').fill('testing1');
    await page.getByLabel('ชื่อ-นามสกุล').click();
    await page.getByLabel('ชื่อ-นามสกุล').fill('testing1');
    await page.getByLabel('อีเมล').click();
    await page.getByLabel('อีเมล').fill('makonsennatthi@gmail.com');
    await page.getByLabel('เบอร์โทรศัพท์', { exact: true }).click();
    await page.getByLabel('เบอร์โทรศัพท์', { exact: true }).fill('0123456789');
    await page.getByLabel('กรุณาใส่รหัสผ่านเพื่อแก้ไขข้อมูลส่วนตัว').click();
    await page.getByLabel('กรุณาใส่รหัสผ่านเพื่อแก้ไขข้อมูลส่วนตัว').fill('' + Dates);
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await expect(page.getByText('ข้อมูล ชื่อผู้ใช้ ไม่สามารถใช้ได้')).toHaveText('ข้อมูล ชื่อผู้ใช้ ไม่สามารถใช้ได้');
    await expect(page.getByText('ข้อมูล อีเมล ไม่สามารถใช้ได้')).toHaveText('ข้อมูล อีเมล ไม่สามารถใช้ได้');
  });

  test('Prohibited signs', async ({ page }) => {
    const Prohibited_signs = ['@','+','*','/','+-','.','!','\'','#','$']
    await page.goto(serverUrl + '/login');
    await page.getByLabel('Qr Code Image').fill('information');
    await page.getByLabel('รหัสผ่าน *').fill('123456789');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    // login
    await page.getByRole('link', { name: '' }).click();
    for (let i = 0; i < Prohibited_signs.length; i++) {
      await page.getByLabel('ชื่อผู้ใช้').fill('information' + Prohibited_signs[i]);
      await page.getByLabel('ชื่อ-นามสกุล').fill('information' + Prohibited_signs[i]);
      await page.getByLabel('อีเมล').fill('makonsennatthi0@gmail.com' + Prohibited_signs[i]);
      await page.getByLabel('เบอร์โทรศัพท์', { exact: true }).fill('0123456789' + Prohibited_signs[i]);
      await page.getByLabel('กรุณาใส่รหัสผ่านเพื่อแก้ไขข้อมูลส่วนตัว').fill('0123456789');
      await page.getByRole('button', { name: 'บันทึก' }).click();
      await expect(page.getByText('ข้อมูล ชื่อผู้ใช้ ต้องมีเเค่ตัวอักษร ตัวเลข เครื่องหมายขีดกลาง เเละเครื่องหมายขีดล่าง เท่านั้น')).toHaveText('ข้อมูล ชื่อผู้ใช้ ต้องมีเเค่ตัวอักษร ตัวเลข เครื่องหมายขีดกลาง เเละเครื่องหมายขีดล่าง เท่านั้น');
      await expect(page.getByText('ข้อมูล อีเมล ต้องเป็นที่อยู่อีเมล')).toHaveText('ข้อมูล อีเมล ต้องเป็นที่อยู่อีเมล');
    }
    
  });

});