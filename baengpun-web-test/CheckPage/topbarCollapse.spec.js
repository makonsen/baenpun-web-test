import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';

test.use({
  launchOptions: {
    slowMo: 700
  },
});

test.describe('topbarCollapse', () => {

  test('Shipping', async ({ page }) => {
      await page.goto(serverUrl);
      await page.locator('#topbarCollapse').getByRole('link', { name: 'การส่งสินค้า' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: การจัดส่งและการคืนสินค้า');
  });

  test('Frequently asked questions', async ({ page }) => {
      await page.goto(serverUrl);
      await page.locator('#topbarCollapse').getByRole('link', { name: 'คำถามที่พบบ่อย' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: คำถามที่พบบ่อย');
  });

  test('Contact us', async ({ page }) => {
      await page.goto(serverUrl);
      await page.locator('#topbarCollapse').getByRole('link', { name: 'ติดต่อเรา' }).click();
      await expect(page).toHaveTitle('แบ่งปั๋น: ติดต่อเรา');
  });

});