import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
const email = 'makonsennatthi_' + Dates + '@gmail.com';
const khon_dot_thai_Domain = 'makonsennatthi_' + Dates + '@คน.ไทย';

const emailData = [
    { invalidEmail: '_@.com' },
    { invalidEmail: '_@domain.' },
    { invalidEmail: '_@domain..com' },
    { invalidEmail: '_@domain,com' },
    { invalidEmail: '_@domain@domain.com' },
    { invalidEmail: '_@domain#com' },
    { invalidEmail: '_@domain com' },
    { invalidEmail: '_@-domain.com' },
    { invalidEmail: '_@.domain.com' },
    { invalidEmail: '_@domain.c_m' },
    { invalidEmail: '_@domain.c*m' },
    { invalidEmail: '_@domain.c0m' },
    { invalidEmail: '_@domain.c' },
];

test('valid email address', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByPlaceholder('กรอกอีเมล *').fill(email);
    await page.getByRole('button', { name: 'ติดตาม' }).click();
    await expect(page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' })).toHaveText('ติดตามรับข่าวสารเรียบร้อยแล้ว');
    await page.getByRole('button', { name: 'Ok' }).click();
});

emailData.forEach(({ invalidEmail }) => {
    test(`invalid email : ${invalidEmail}` , async ({ page }) => {
        await page.goto(serverUrl);
        await page.getByPlaceholder('กรอกอีเมล *').fill('user_'+Dates+invalidEmail);
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
 
test('khon.thai domains', async ({ page }) => {
    await page.goto(serverUrl);
    await page.getByPlaceholder('กรอกอีเมล *').fill(khon_dot_thai_Domain);
    await page.getByRole('button', { name: 'ติดตาม' }).click();
    await expect(page.getByRole('heading', { name: 'ติดตามรับข่าวสารเรียบร้อยแล้ว' })).toHaveText('ติดตามรับข่าวสารเรียบร้อยแล้ว');
    await page.getByRole('button', { name: 'Ok' }).click();
});