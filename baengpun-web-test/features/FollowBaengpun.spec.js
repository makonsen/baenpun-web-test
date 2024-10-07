import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
const email = 'makonsennatthi_' + Dates + '@gmail.com';
const email_domain = 'makonsennatthi_' + Dates + '@คน.ไทย';
const emailData = [
    { invalidEmail: '@gmail.com' },
    { invalidEmail: 'username@.com' },
    { invalidEmail: 'username@domain.' },
    { invalidEmail: 'username@domain..com' },
    { invalidEmail: 'username@domain,com' },
    { invalidEmail: 'username@domain@domain.com' },
    { invalidEmail: 'username@domain#com' },
    { invalidEmail: 'username@domain com' },
    { invalidEmail: 'username@-domain.com' },
    { invalidEmail: 'username@domain.com.' },
    { invalidEmail: 'username@.domain.com' },
    { invalidEmail: 'user name@domain.com' },
    { invalidEmail: 'username@domain.c' },
    { invalidEmail: 'user@domain.c_m' },
    { invalidEmail: 'user@domain.c*m' },
    { invalidEmail: 'user@domain.c0m' },
    { invalidEmail: '-user@domain.com' },
];

test('valid email address', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByPlaceholder('กรอกอีเมล *').fill(email);
    await page.getByRole('button', { name: 'ติดตาม' }).click();
    await expect(page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' })).toHaveText('ติดตามรับข่าวสารเรียบร้อยแล้ว');
    await page.getByRole('button', { name: 'Ok' }).click();
});

emailData.forEach(({ invalidEmail }) => {
    test(`invalid email :  ${invalidEmail}`, async ({ page }) => {
        await page.goto(serverUrl);
        await page.getByPlaceholder('กรอกอีเมล *').fill(invalidEmail);
        await page.getByRole('button', { name: 'ติดตาม' }).click();
        await expect(page.getByRole('heading', { name: 'ข้อมูล อีเมล ต้องเป็นที่อยู่อีเมล' })).toHaveText('ข้อมูล อีเมล ต้องเป็นที่อยู่อีเมล');
        await page.getByRole('button', { name: 'Ok' }).click();
    });
})

test('blank email address', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByPlaceholder('กรอกอีเมล *').fill('');
    await page.getByRole('button', { name: 'ติดตาม' }).click();
    await expect(page.getByRole('heading', { name: 'กรุณากรอกอีเมล์เพื่อสมัครสมาชิก' })).toHaveText('กรุณากรอกอีเมล์เพื่อสมัครสมาชิก');
    await page.getByRole('button', { name: 'Ok' }).click();
});

test('already susbcribed email', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByPlaceholder('กรอกอีเมล *').fill('makonsennatthi@gmail.com');
    await page.getByRole('button', { name: 'ติดตาม' }).click();
    await expect(page.getByRole('heading', { name: 'คุณสมัครแล้ว' })).toHaveText('คุณสมัครแล้ว');
    await page.getByRole('button', { name: 'Ok' }).click();
});

test('other domains', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByPlaceholder('กรอกอีเมล *').fill(email_domain);
    await page.getByRole('button', { name: 'ติดตาม' }).click();
    await expect(page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' })).toHaveText('ติดตามรับข่าวสารเรียบร้อยแล้ว');
    await page.getByRole('button', { name: 'Ok' }).click();
});