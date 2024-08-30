import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';

test.use({
  launchOptions: {
    slowMo: 500
  },
});

test.describe('navbarCollapse', () => {

  test('Home page', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByRole('link', { name: 'หน้าแรก' }).click();
    await expect(page).toHaveTitle('แบ่งปั๋น');
  });

  test.describe('My Account', () => {

    test('trolley', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
      await page.getByRole('link', { name: 'รถเข็น' }).click();
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await page.getByRole('link', { name: 'ตรวจสอบรายการสินค้า' }).click();
      await expect(page).toHaveTitle('ทั้งหมด');
    });

    test('Shipping and Returns', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
      await page.getByRole('link', { name: 'การจัดส่งสินค้าและการคืนสินค้า' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
    });

    test('My information', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
      await page.getByRole('link', { name: 'ข้อมูลของฉัน', exact: true }).click();
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'ข้อมูลของฉัน' })).toHaveText('ข้อมูลของฉัน');
    });

    test('My Orders', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
      await page.getByRole('link', { name: 'คำสั่งซื้อของฉัน' }).click();
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'คำสั่งซื้อของฉัน' })).toHaveText('คำสั่งซื้อของฉัน');
    });

    test('Change password', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
      await page.getByRole('link', { name: 'เปลี่ยนรหัสผ่าน' }).click();
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'เปลี่ยนรหัสผ่าน' })).toHaveText('เปลี่ยนรหัสผ่าน');
    });

    test('Favorites', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'บัญชีของฉัน' }).hover();
      await page.getByRole('link', { name: 'รายการโปรด', exact: true }).click();
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'รายการโปรด' })).toHaveText('รายการโปรด');
    });

  });

  test.describe('About us', () => {

    test('Background from the navbarCollapse', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
      await page.locator('#navbarCollapse').getByRole('link', { name: 'ความเป็นมา' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: ความเป็นมา');
    });

    test('Contact us from the navbarCollapse', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
      await page.locator('#navbarCollapse').getByRole('link', { name: 'ติดต่อเรา' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
    });

    test('Our activities from the navbarCollapse', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
      await page.getByRole('link', { name: 'กิจกรรมของเรา' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: กิจกรรมของเรา');
    });

    test('Frequently asked questions from the navbarCollapse', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'เกี่ยวกับเรา' }).hover();
      await page.locator('#navbarCollapse').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
    });
  });

  test('booklet page', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByRole('link', { name: 'จุลสาร' }).click();
    await expect(page).toHaveTitle('แบ่งปั๋น: กิจกรรมของเรา');
  });

  test.describe('search', () => {

    test('Category => all', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: '' }).click();
      await page.getByRole('button', { name: '' }).click();
      await expect(page).toHaveTitle('ทั้งหมด');
      await expect(page.getByRole('heading', { name: 'ทั้งหมด' })).toHaveText('ทั้งหมด');
    });

    test('Category => Products from the community', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: '' }).click();
      await page.getByLabel('ค้นหาสินค้า:').selectOption('COMMUNITYPRODUCTS');
      await page.getByRole('button', { name: '' }).click();
      await expect(page).toHaveTitle('ผลิตภัณฑ์จากชุมชน');
      await expect(page.getByRole('heading', { name: 'ผลิตภัณฑ์จากชุมชน' })).toHaveText('ผลิตภัณฑ์จากชุมชน');
    });

    test('Category => Handicraft', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: '' }).click();
      await page.getByLabel('ค้นหาสินค้า:').selectOption('HANDICRAFT');
      await page.getByRole('button', { name: '' }).click();
      await expect(page).toHaveTitle('ผลิตภัณฑ์หัตถกรรม');
      await expect(page.getByRole('heading', { name: 'งานฝีมือ' })).toHaveText('งานฝีมือ');
    });

    test('Category => Service', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: '' }).click();
      await page.getByLabel('ค้นหาสินค้า:').selectOption('SERVICES');
      await page.getByRole('button', { name: '' }).click();
      await expect(page).toHaveTitle('บริการ');
      await expect(page.getByRole('heading', { name: 'งานบริการ' })).toHaveText('งานบริการ');
    });

  });
  
  test.describe('profile',()=>{

    test('My information', async ({ page }) => {
      await page.goto(serverUrl+'/login');
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await page.getByRole('link', { name: '' }).click();
      await expect(page.getByRole('heading', { name: 'ข้อมูลของฉัน' })).toHaveText('ข้อมูลของฉัน');
    });

    test('address', async ({ page }) => {
      await page.goto(serverUrl+'/login');
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await page.getByRole('link', { name: '' }).click();
      await page.getByRole('link', { name: ' ที่อยู่ ' }).click();
      await expect(page.getByRole('heading', { name: 'ที่อยู่' })).toHaveText('ที่อยู่');
    });

    test('Purchase Order', async ({ page }) => {
      await page.goto(serverUrl+'/login');
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await page.getByRole('link', { name: '' }).click();
      await page.getByRole('link', { name: ' คำสั่งซื้อ ' }).click();
      await expect(page.getByRole('heading', { name: 'คำสั่งซื้อของฉัน' })).toHaveText('คำสั่งซื้อของฉัน');
    });

    test('Return/Refund', async ({ page }) => {
      await page.goto(serverUrl+'/login');
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await page.getByRole('link', { name: '' }).click();
      await page.getByRole('link', { name: ' ส่งคืน/คืนเงิน ' }).click();
      await expect(page.getByRole('heading', { name: 'ส่งคืน/คืนเงิน' })).toHaveText('ส่งคืน/คืนเงิน');
    });

    test('Favorites', async ({ page }) => {
      await page.goto(serverUrl+'/login');
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await page.getByRole('link', { name: '' }).click();
      await page.getByRole('link', { name: ' รายการโปรด ' }).click();
      await expect(page.getByRole('heading', { name: 'รายการโปรด' })).toHaveText('รายการโปรด');
    });

    test('Edit password', async ({ page }) => {
      await page.goto(serverUrl+'/login');
      await page.getByLabel('Qr Code Image').click();
      await page.getByLabel('Qr Code Image').fill('testing1');
      await page.getByLabel('รหัสผ่าน *').click();
      await page.getByLabel('รหัสผ่าน *').fill('123456789');
      await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
      await page.getByRole('link', { name: '' }).click();
      await page.getByRole('link', { name: ' แก้ไขรหัสผ่าน ' }).click();
      await expect(page.getByRole('heading', { name: 'เปลี่ยนรหัสผ่าน' })).toHaveText('เปลี่ยนรหัสผ่าน');
    });

    // test('address', async ({ page }) => {
    //   await page.goto(serverUrl+'/login');
    //   await page.getByLabel('Qr Code Image').click();
    //   await page.getByLabel('Qr Code Image').fill('testing1');
    //   await page.getByLabel('รหัสผ่าน *').click();
    //   await page.getByLabel('รหัสผ่าน *').fill('123456789');
    //   await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    //   await page.getByRole('link', { name: '' }).click();
    //   await page.getByRole('link', { name: ' ชุมชน ' }).click();
    //   await expect(page.getByRole('heading', { name: 'ข้อมูลของฉัน' })).toHaveText('ข้อมูลของฉัน');
    // });


  });

  test('Favorites', async ({ page }) => {
    await page.goto(serverUrl+'/login');
    await page.getByLabel('Qr Code Image').click();
    await page.getByLabel('Qr Code Image').fill('testing1');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('123456789');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await page.getByRole('link', { name: '' }).click();
    await expect(page.getByRole('heading', { name: 'รายการโปรด' })).toHaveText('รายการโปรด');
  });

  test('trolley', async ({ page }) => {
    await page.goto(serverUrl+'/login');
    await page.getByLabel('Qr Code Image').click();
    await page.getByLabel('Qr Code Image').fill('testing1');
    await page.getByLabel('รหัสผ่าน *').click();
    await page.getByLabel('รหัสผ่าน *').fill('123456789');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await page.getByRole('link', { name: '' }).click();
    await expect(page.getByRole('heading', { name: 'รถเข็น' })).toHaveText('รถเข็น');
  });

});
