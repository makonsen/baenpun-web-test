import { test, expect } from '@playwright/test';
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const Dates = (new Date()).getTime();
const username = 'user_' + Dates;
const email = 'test' + Dates + '@email.com';
const productTestID = process.env.PRODUCT_TEST_ID || '1';
const sellerUrl = process.env.SELLER_URL || 'http://localhost:8003';
const sellerUsername = process.env.SELLER_USERNAME || 'seller@email.com';
const sellerPassword = process.env.SELLER_PASSWORD || '1234568';

// set the timeout to 1 minute
test.setTimeout(60000);

test('Order as a guest - Complete', async ({ page }) => {
    await page.goto(serverUrl + '/product/' + productTestID);

    // locate 'input' for notes and fill with test notes
    await page.locator('input[name="notes"]').fill('test notes');

    await page.getByRole('button', { name: 'ใส่รถเข็น' }).click();

    await page.getByText('เลือกสินค้า', { exact: true }).click();
    await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    await page.getByRole('button', { name: 'ชำระเงินโดยไม่เป็นสมาชิก' }).click();

    await page.getByPlaceholder('ชื่อ').fill(username);
    await page.getByPlaceholder('อีเมล', { exact: true }).fill(email);
    await page.getByPlaceholder('เบอร์โทรศัพท์').fill('0123456789');
    await page.getByPlaceholder('ที่อยู่').fill('ที่อยู่');
    await page.getByPlaceholder('ค้นหาจังหวัด').click();
    await page.getByText('กรุงเทพมหานคร / Bangkok').click();
    await page.getByPlaceholder('ค้นหาเขต/อำเภอ').click();
    await page.getByText('เขตคลองสาน / Khet Khlong San').click();
    await page.getByPlaceholder('ค้นหาแขวง/ตำบล หรือ เลขไปรษณีย์').click();
    await page.getByText('คลองต้นไทร / Khlong Ton Sai -').click();
    await page.getByRole('button', { name: 'บันทึกที่อยู่' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('button', { name: 'ดำเนินการต่อ' }).click();
    
    // click on 'ดูรายละเอียดคำสั่งซื้อ'(Order Details) link
    await page.getByRole('link', { name: 'ดูรายละเอียดคำสั่งซื้อ' }).click();

    const guestOrderUrl = await page.url();

    await page.goto(sellerUrl + '/login');
    await page.getByPlaceholder('ที่อยู่อีเมล').fill(sellerUsername);
    await page.getByPlaceholder('รหัสผ่าน').fill(sellerPassword);
    await page.getByRole('button', {name: 'เข้าสู่ระบบ'}).click();
    await page.goto(sellerUrl + '/orders');

    // click the refresh button
    await page.getByRole('button', {name: 'โหลดซ้ำ'}).click();

    // wait for network to finish
    await page.waitForLoadState('networkidle');

    // the first order status on the 7th column with the status(สถานะคำสั่งซื้อ) header should be
    // รอการยืนยันคำสั่งซื้อ
    await expect(page.locator('table tbody tr:nth-of-type(1) td:nth-of-type(7)')).toHaveText('รอการยืนยันคำสั่งซื้อ');

    // get the text of the first column
    const firstColumn = await page.locator('table tbody tr:nth-of-type(1) td:nth-of-type(1)').textContent();
    // get numeric value of the first column
    const orderId = parseInt(firstColumn);


    //  Click the link with name orderId
    await page.getByRole('link', {name: orderId}).click();


    // should see the approval (ยืนยันคำสั่งซื้อ) button
    await expect(page.getByRole('link', {name: 'ยืนยันคำสั่งซื้อ'})).toBeVisible();

    // click the approval button
    await page.getByRole('link', {name: 'ยืนยันคำสั่งซื้อ'}).click();


    // should see the input box for shipping_fee
    await expect(page.locator('#shipping_fee').first()).toBeVisible();

    // fill the shipping fee
    await page.locator('#shipping_fee').first().fill('50');

    // click the 'submit' button
    await page.getByRole('button', {name: 'ยืนยัน'}).click();

    // should redirect to the order page
    await expect(page).toHaveURL(sellerUrl + '/orders/' + orderId);

    // go back to the Guest Order Page URL and check the order status
    await page.goto(guestOrderUrl);

    // should see the status 'waiting for payment'(รอการชำระเงิน) on the page
    await expect(page).toHaveText('รอการชำระเงิน');

    // click the link with text 'ชำระเงินตอนนี้'
    await page.getByRole('link', {name: 'ชำระเงินตอนนี้'}).click();

    // should see the text 'ชำระเงินด้วยการโอนเงินผ่านธนาคาร' (Pay by bank transfer)
    await expect(page).toHaveText('ชำระเงินด้วยการโอนเงินผ่านธนาคาร');

    // click the link with text 'อัปโหลดหลักฐานการชำระเงิน' (upload payment proof)
    await page.getByRole('link', {name: 'อัปโหลดหลักฐานการชำระเงิน'}).click();

    // click the link with text 'เลือกรูปภาพหลักฐานการชำระเงิน' (choose payment proof image)
    // this will open the file dialog, so we need to wait for it to open
    await page.getByRole('link', {name: 'เลือกรูปภาพหลักฐานการชำระเงิน'}).click();

    // wait for the file dialog to open
    await page.waitForFileChooser();
    // chose the qr_code.jpg in this folder
    await page.setInputFiles('input[type="file"]', 'qr_code.jpg');

    // click the 'ตกลง' (agree) button
    await page.getByRole('button', {name: 'ตกลง'}).click();

    // should redirect back to the order page
    // await expect(page).toHaveURL(serverUrl + '/my-orders/' + orderId);

    // should see the response message 'คุณได้อัปโหลดหลักฐานการชำระเงินแล้ว' (You've uploaded proof of payment)
    await expect(page).toHaveText('คุณได้อัปโหลดหลักฐานการชำระเงินแล้ว');


});



