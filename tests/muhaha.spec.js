import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  for (let index = 0; index < 10 ; index++) {
    await page.goto('https://ngl.link/v3_g4s2?fbclid=PAZXh0bgNhZW0CMTEAAabRKUj2ph-Vwq3wUCeBX8JASidxKXcFv9uKib3yMVPaatLX58hDxr9jgyw_aem_EShKExWXYE0MAGSoIDBQiQ');
    await page.getByText('🎲').click();
    await page.getByRole('button', { name: 'ส่ง!' }).click();
    await page.getByRole('link').first().click();
  }
});