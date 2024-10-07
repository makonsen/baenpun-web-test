import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
const email = 'makonsennatthi_' + Dates + '@gmail.com';
const password = 'รหัส' + Dates;
const symbol = ['@', '+', '*', '/', '+-', '.', '!', '\'', '#', '$'];
const numberData = [
    { number: '123', expects: '' },
    { number: '12345678901234567890 ', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร' },
    { number: '123-ABC-4567', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร' },
    { number: '091#123$456', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร' },
    { number: 'phone123', expects: '' },
    { number: '@12345678', expects: '' },
    { number: '+66-(080)-123-4567', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร' },
    { number: '+66+080+123+4567', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร' },
    { number: '0000000000', expects: '' },
    { number: '0123456789', expects: '' },
];
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

test.use({
    launchOptions: {
        slowMo: 500
    },
});

test('Correct value', async ({ page }) => {
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill('user_' + Dates);// ใส่ชื่อผู้ใช้ Enter username
    await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates);// ใส่ชื่อ นาม สกุล Enter your first and last name
    await page.getByLabel('อีเมล').fill(email);// ใส่อีเมล Enter email
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);// ยืนยันรหัสผ่าน Confirm password
    await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');// ใส่เบอร์ Enter number
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();

    // ยืนยันบัญชี Verify Account
    await page.goto(serverUrl + '/scripts/verify-email-auto?email=' + email);

    // ล็อคอิน Login
    await page.goto(serverUrl + '/login');
    await page.getByLabel('Qr Code Image').fill('user_' + Dates);

    // ใส่รหัสผ่าน Enter password
    await page.getByLabel('รหัสผ่าน *').fill(password);
    await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
    await page.getByRole('link', { name: 'Baengpun' }).click();

    // ตรวจสอบค่าต่างๆ
    await page.goto(serverUrl);
    await page.getByRole('link', { name: '' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('link', { name: 'บัญชีของฉัน (มกรเสน' })).toHaveText('บัญชีของฉัน (มกรเสน  user_' + Dates + ')');
    await expect(page.getByLabel('ชื่อผู้ใช้')).toHaveValue('user_' + Dates);
    await expect(page.getByLabel('ชื่อ-นามสกุล')).toHaveValue('มกรเสน  user_' + Dates);
    await expect(page.getByLabel('อีเมล')).toHaveValue('makonsennatthi_' + Dates + '@gmail.com');
});

// test('Sign up with a symbolic username', async ({ page }) => {
//     const symbol = ['-', '_', '+', '*', '/', '@', '#', '$', '%', '^', '&', '()']
//     await page.goto(serverUrl + '/register');
//     await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates); // ใส่ชื่อ นาม สกุล Enter your first and last name
//     await page.getByLabel('อีเมล').fill(email);// ใส่อีเมล Enter email
//     await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
//     await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);// ยืนยันรหัสผ่าน Confirm password
//     await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');// ใส่เบอร์ Enter number
//     for (let i = 0; i < symbol.length; i++) {
//         await page.locator('#username').fill(symbol[i]);// ใส่ชื่อผู้ใช้ Enter username
//         await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
//         await expect(page.getByText('ข้อมูล ชื่อผู้ใช้ ต้องมีเเค่ตัวอักษร ตัวเลข เครื่องหมายขีดกลาง เเละเครื่องหมายขี')).toBeHidden(page.goto(serverUrl + '/scripts/verify-email-auto?email=' + email))
//         // // await expect(page.getByText('ข้อมูล ชื่อผู้ใช้ ไม่สามารถใช้ได้').click()).toBeHidden(page.getByLabel('เบอร์โทรศัพท์').fill('00'))

//         if (page.getByText('ข้อมูล ชื่อผู้ใช้ ต้องมีเเค่ตัวอักษร ตัวเลข เครื่องหมายขีดกลาง เเละเครื่องหมายขี')) {
//             // ยืนยันบัญชี Verify Account
//             await page.getByLabel('เบอร์โทรศัพท์').fill('11');
//             // await page.goto(serverUrl + '/scripts/verify-email-auto?email=' + email);
//         } else if (page.getByText('ข้อมูล ชื่อผู้ใช้ ไม่สามารถใช้ได้')) {
//             await page.getByLabel('เบอร์โทรศัพท์').fill('00');
//         }
//     }

// });

// Sign up sing another domain name

emailData.forEach(({ invalidEmail }) => {
    test(`Signed up with an invalid email address : ${invalidEmail}`, async ({ page }) => {
        await page.goto(serverUrl + '/register');
        await page.locator('#username').fill('user_' + Dates);
        await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates);
        await page.getByLabel('อีเมล').fill(invalidEmail);
        await page.getByLabel('ตั้งรหัสผ่าน').fill(password);
        await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);
        await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');
        await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
        await expect(page.getByText('ข้อมูล อีเมล ต้องเป็นที่อยู่อีเมล')).toHaveText('ข้อมูล อีเมล ต้องเป็นที่อยู่อีเมล');
    });
});

// Sign up sing another domain name

// Sign up with an existing email address

// Sign up with a code less than 8 digits

// Sign up with a very long password

numberData.forEach(({ number, expects }) => {
    test(`Sign up with an invalid number:  ${number}`, async ({ page }) => {
        await page.goto(serverUrl + '/register');
        await page.locator('#username').fill('user_' + Dates);// ใส่ชื่อผู้ใช้ Enter username
        await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates); // ใส่ชื่อ นาม สกุล Enter your first and last name
        await page.getByLabel('อีเมล').fill('makonsennatthi_' + Dates + '@gmail.com');// ใส่อีเมล Enter email
        await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
        await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);// ยืนยันรหัสผ่าน Confirm password
        await page.getByLabel('เบอร์โทรศัพท์').fill(number);// ใส่เบอร์ Enter number
        await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
        await expect(page.getByText('ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร')).toHaveText(expects);
    });
});

test('Registration with empty value', async ({ page }) => {
    await page.goto(serverUrl + '/register');
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    await expect(page.getByRole('heading', { name: 'ลงทะเบียน' })).toHaveText('ลงทะเบียน')
});

test('Registration with duplicate email', async ({ page }) => {
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill('user_' + Dates);// ใส่ชื่อผู้ใช้ Enter username
    await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates); // ใส่ชื่อ นาม สกุล Enter your first and last name
    await page.getByLabel('อีเมล').fill('testing@gmail.com');// ใส่อีเมล Enter email
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);// ยืนยันรหัสผ่าน Confirm password
    await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');// ใส่เบอร์ Enter number
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    await expect(page.getByText('ข้อมูล อีเมล ไม่สามารถใช้ได้')).toHaveText('ข้อมูล อีเมล ไม่สามารถใช้ได้');
});

test('Verification passwords do not match', async ({ page }) => {
    const passwordB = 'รหัส' + Dates + 's';
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill('user_' + Dates);// ใส่ชื่อผู้ใช้ Enter username
    await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates); // ใส่ชื่อ นาม สกุล Enter your first and last name
    await page.getByLabel('อีเมล').fill(email);// ใส่อีเมล Enter email
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(passwordB);// ยืนยันรหัสผ่าน Confirm password
    await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');// ใส่เบอร์ Enter number
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    await expect(page.getByText('ข้อมูล รหัสผ่าน ไม่ตรงกัน')).toHaveText('ข้อมูล รหัสผ่าน ไม่ตรงกัน');
});

test('Sign up with a password with a symbol', async ({ page }) => {
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill('user_' + Dates);
    await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Dates);
    await page.getByLabel('อีเมล').fill(email);
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password + symbol[0]);
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(password + symbol[0]);
    await page.getByLabel('เบอร์โทรศัพท์').fill('0123456789');
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
})

test('Apply with a number with a symbol', async ({ page }) => {
    for (let i = 0; i < symbol.length; i++) {
        const Date_symbol = (new Date()).getTime();
        await page.goto(serverUrl + '/register');
        await page.locator('#username').fill('user_' + Date_symbol);// ใส่ชื่อผู้ใช้ Enter username
        await page.getByLabel('ชื่อผู้ใช้').fill('มกรเสน  user_' + Date_symbol); // ใส่ชื่อ นาม สกุล Enter your first and last name
        await page.getByLabel('อีเมล').fill('makonsennatthi_' + Date_symbol + '@gmail.com');// ใส่อีเมล Enter email
        await page.getByLabel('ตั้งรหัสผ่าน').fill('รหัส' + Date_symbol);// ใส่รหัสผ่าน Enter password
        await page.getByLabel('ยืนยันรหัสผ่าน').fill('รหัส' + Date_symbol);// ยืนยันรหัสผ่าน Confirm password
        await page.getByLabel('เบอร์โทรศัพท์').fill('0123456' + symbol[i]);// ใส่เบอร์ Enter number
        await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    };
});

