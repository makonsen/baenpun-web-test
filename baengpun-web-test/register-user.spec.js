import {test, expect} from '@playwright/test';

const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
const email = 'test_' + Dates + '@email.com';
const username = 'user_' + Dates;
const name = 'มกรเสน  user_' + Dates;
const password = 'รหัส' + Dates;
const phone = '0123456789';
const mailType = process.env.MAIL_TYPE || 'mailhog';
const mailSender = process.env.MAIL_SENDER || 'Local Mail';
const mailHog = process.env.MAIL_HOG || 'http://localhost:8025';
const mailConfirm = process.env.MAIL_CONFIRM === 'true';

if (mailConfirm) {
    console.log('Verify the  email by clicking the link in the email');
} else {
    console.log('Verify the email by calling the API');
}

const symbol = ['@', '+', '*', '/', '+-', '.', '!', '\'', '#', '$'];
const numberData = [
    // {number: '123', expects: ''},
    {number: '12345678901234567890 ', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร'},
    {number: '123-ABC-4567', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร'},
    {number: '091#123$456', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร'},
    // {number: 'phone123', expects: ''},
    // {number: '@12345678', expects: ''},
    {number: '+66-(080)-123-4567', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร'},
    {number: '+66+080+123+4567', expects: 'ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร'},
    // {number: '0000000000', expects: ''},
    // {number: '0123456789', expects: ''},
];
const emailData = [
    {invalidEmail: '@email.com'},
    {invalidEmail: 'username@.com'},
    {invalidEmail: 'username@domain.'},
    {invalidEmail: 'username@domain..com'},
    {invalidEmail: 'username@domain,com'},
    {invalidEmail: 'username@domain@domain.com'},
    {invalidEmail: 'username@domain#com'},
    {invalidEmail: 'username@domain com'},
    {invalidEmail: 'username@-domain.com'},
    {invalidEmail: 'username@domain.com.'},
    {invalidEmail: 'username@.domain.com'},
    {invalidEmail: 'user name@domain.com'},
    {invalidEmail: 'user@domain.c_m'},
    {invalidEmail: 'user@domain.c*m'},
    // {invalidEmail: 'username@domain.c'}, // this is valid
    // {invalidEmail: 'user@domain.c0m'}, // this is valid
    // {invalidEmail: '-user@domain.com'}, // this is valid
];

test.use({
    launchOptions: {
        slowMo: parseInt(process.env.SLOW_MO) || 0
    },
});

/*
 laravel Validations
   'username' => ['required', 'string', 'max:50', "alpha_dash", 'unique:users,username'],
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
                'phone' => ['required', 'string', 'max:10'],
 */

test('Register user with correct values', async ({page}) => {
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill(username);         // ใส่ชื่อผู้ใช้ Enter username
    await page.getByLabel('ชื่อผู้ใช้').fill(name);          // ใส่ชื่อ นาม สกุล Enter your first and last name
    await page.getByLabel('อีเมล').fill(email);          // ใส่อีเมล Enter email
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password);           // ใส่รหัสผ่าน Enter password
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);         // ยืนยันรหัสผ่าน Confirm password
    await page.getByLabel('เบอร์โทรศัพท์').fill(phone);         // ใส่เบอร์ Enter number
    await page.getByRole('button', {name: 'ลงทะเบียน'}).click();

    // ยืนยันบัญชี Verify Account
    if (mailConfirm) {
        // case mailhog
        // @todo use api call to check email
        await page.goto(mailHog);
        await page.getByText(mailSender + ' ' + email).first().click();
        await page.frameLocator('#preview-html').getByRole('link', {name: 'ยืนยันอีเมลจากระบบแบ่งปั๋น'}).click();

        // other mailers

    } else {
        const response = await page.request.post(serverUrl + '/api/test/verify-email', {
            data: {email: email}
        });
        const responseBody = await response.json();
        if (responseBody.status !== 'success') {
            console.error('Email not found, unable to verify email');
            process.exit(1);
        }

    }
    // ตรวจสอบค่าต่างๆ
    await page.goto(serverUrl + '/my-account');
    await expect(page.getByLabel('ชื่อผู้ใช้')).toHaveValue(username);
    await expect(page.getByLabel('ชื่อ-นามสกุล')).toHaveValue(name);
    await expect(page.getByLabel('อีเมล')).toHaveValue(email);
    await expect(page.getByLabel('เบอร์โทรศัพท์', {exact: true})).toHaveValue(phone);

});


test('Test registration and login', async ({page}) => {
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill(username);
    await page.getByLabel('ชื่อผู้ใช้').fill(name);
    await page.getByLabel('อีเมล').fill(email);
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password);
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);
    await page.getByLabel('เบอร์โทรศัพท์').fill(phone);
    await page.getByRole('button', {name: 'ลงทะเบียน', exact: true}).click();

    // ยืนยันบัญชี Verify Account
    if (mailConfirm) {
        // case mailhog
        await page.goto(mailHog);
        await page.getByText(mailSender + ' ' + email).first().click();
        await page.frameLocator('#preview-html').getByRole('link', {name: 'ยืนยันอีเมลจากระบบแบ่งปั๋น'}).click();
    } else {
        const response = await page.request.post(serverUrl + '/api/test/verify-email', {
            data: {email: email}
        });
        const responseBody = await response.json();
        if (responseBody.status !== 'success') {
            console.error('Email not found, unable to verify email');
            process.exit(1);
        }

    }

    // ล็อคอิน Logout
    await page.goto(serverUrl);
    await page.locator('a.nav-link.logout-button').click();

    // ล็อคอิน Login
    await page.goto(serverUrl + '/login');
    await page.locator('#login').fill(username);

    // ใส่รหัสผ่าน Enter password
    await page.locator('#loginPassword').fill(password);
    await page.getByRole('button', {name: 'เข้าสู่ระบบ', exact: true}).click();

    // @todo should test something

    // go to home page
    await page.goto(serverUrl);

    // ตรวจสอบค่าต่างๆ
    await page.goto(serverUrl + '/my-account');
    await expect(page.getByRole('link', {name: 'บัญชีของฉัน (มกรเสน'})).toHaveText('บัญชีของฉัน (มกรเสน  user_' + Dates + ')');
    await expect(page.getByLabel('ชื่อผู้ใช้')).toHaveValue(username);
    await expect(page.getByLabel('ชื่อ-นามสกุล')).toHaveValue(name);
    await expect(page.getByLabel('อีเมล')).toHaveValue(email);
    await expect(page.getByLabel('เบอร์โทรศัพท์', {exact: true})).toHaveValue(phone);

});



numberData.forEach(({ number, expects }) => {
    test(`Sign up with an phone number more than 10 characters:  ${number}`, async ({ page }) => {
        await page.goto(serverUrl + '/register');
        await page.locator('#username').fill(username);// ใส่ชื่อผู้ใช้ Enter username
        await page.getByLabel('ชื่อผู้ใช้').fill(name); // ใส่ชื่อ นาม สกุล Enter your first and last name
        await page.getByLabel('อีเมล').fill('test_' + Dates + '@gmail.com');// ใส่อีเมล Enter email
        await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
        await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);// ยืนยันรหัสผ่าน Confirm password
        await page.getByLabel('เบอร์โทรศัพท์').fill(number);// ใส่เบอร์ Enter number
        await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
        await expect(page.locator('span.invalid-feedback strong')).toContainText(['ข้อมูล เบอร์โทรศัพท์ ต้องมีความยาวตัวอักษรไม่เกิน 10 ตัวอักษร'], { useInnerText: true });
    });
});

test('Registration with empty value', async ({ page }) => {
    await page.goto(serverUrl + '/register');
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    await expect(page.getByRole('heading', { name: 'ลงทะเบียน' })).toHaveText('ลงทะเบียน')
});

test('Registration with duplicate email', async ({ page }) => {
    for (let i = 0; i < 2; i++) {
        await page.goto(serverUrl + '/register');
        await page.locator('#username').fill(username);// ใส่ชื่อผู้ใช้ Enter username
        await page.getByLabel('ชื่อผู้ใช้').fill(name); // ใส่ชื่อ นาม สกุล Enter your first and last name
        await page.getByLabel('อีเมล').fill('admin@baengpun.in.th');// ใส่อีเมล Enter email
        await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
        await page.getByLabel('ยืนยันรหัสผ่าน').fill(password);// ยืนยันรหัสผ่าน Confirm password
        await page.getByLabel('เบอร์โทรศัพท์').fill(phone);// ใส่เบอร์ Enter number
        await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
        await expect(page.getByText('ข้อมูล อีเมล ไม่สามารถใช้ได้')).toHaveText('ข้อมูล อีเมล ไม่สามารถใช้ได้');
    }
});

test('Verification passwords do not match', async ({ page }) => {
    const passwordB = 'รหัส' + Dates + 's';
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill(username);// ใส่ชื่อผู้ใช้ Enter username
    await page.getByLabel('ชื่อผู้ใช้').fill(name); // ใส่ชื่อ นาม สกุล Enter your first and last name
    await page.getByLabel('อีเมล').fill(email);// ใส่อีเมล Enter email
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password);// ใส่รหัสผ่าน Enter password
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(passwordB);// ยืนยันรหัสผ่าน Confirm password
    await page.getByLabel('เบอร์โทรศัพท์').fill(phone);// ใส่เบอร์ Enter number
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
    await expect(page.getByText('ข้อมูล รหัสผ่าน ไม่ตรงกัน')).toHaveText('ข้อมูล รหัสผ่าน ไม่ตรงกัน');
});

test('Sign up with a password with a symbol', async ({ page }) => {
    await page.goto(serverUrl + '/register');
    await page.locator('#username').fill(username);
    await page.getByLabel('ชื่อผู้ใช้').fill(name);
    await page.getByLabel('อีเมล').fill(email);
    await page.getByLabel('ตั้งรหัสผ่าน').fill(password + symbol[0]);
    await page.getByLabel('ยืนยันรหัสผ่าน').fill(password + symbol[0]);
    await page.getByLabel('เบอร์โทรศัพท์').fill(phone);
    await page.getByRole('button', { name: 'ลงทะเบียน' }).click();
});
