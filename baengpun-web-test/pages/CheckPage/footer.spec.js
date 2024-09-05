import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
test.use({
  launchOptions: {
    slowMo: 700
  },
});

test.describe('footer', () => {

  test.describe('help', () => {

    test('Background', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'ความเป็นมา' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: ความเป็นมา');
    });

    test('Contact us', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('contentinfo').getByRole('link', { name: 'ติดต่อเรา' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
    });

    test('Frequently asked questions', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('contentinfo').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
    });

    test('Shipping', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('contentinfo').getByRole('link', { name: 'การส่งสินค้า' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
    });
  });

  test.describe('type', () => {

    test('Background', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'งานฝีมือ' }).click();
      await expect(page).toHaveTitle('ผลิตภัณฑ์หัตถกรรม');
    });

    test('Service work', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'งานบริการ' }).click();
      await expect(page).toHaveTitle('บริการ');
    });

    test('Products from the community', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'ผลิตภัณฑ์จากชุมชน' }).click();
      await expect(page).toHaveTitle('ผลิตภัณฑ์จากชุมชน');
    });

  });

  test.describe('Community sharing shop', () => {

    test('Additional communities', async ({ page }) => {
      await page.goto(serverUrl);
      await page.getByRole('link', { name: 'ชุมชนเพิ่มเติม' }).click();
      await expect(page.locator('h3').filter({ hasText: 'ร้านค้าชุมชนแบ่งปั๋น' })).toHaveText('ร้านค้าชุมชนแบ่งปั๋น');
    });

  });

  test('Follow baengpun', async ({ page }) => {
    const email = 'makonsennatthi_' + Dates + '@gmail.com';
    await page.goto(serverUrl);
    await page.getByPlaceholder('กรอกอีเมล *').click();
    await page.getByPlaceholder('กรอกอีเมล *').fill(email);
    await page.getByRole('button', { name: 'ติดตาม' }).click();
    await expect(page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' })).toHaveText('ติดตามรับข่าวสารเรียบร้อยแล้ว');
    await page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
  });

});