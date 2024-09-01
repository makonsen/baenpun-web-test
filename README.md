
# Test Baengpun website ระบบทดสอบเว็บไซแบ่งปั๋น.ไทย
This project is a test suite for the Baenpun web application using Playwright. It helps ensure that the web application functions as expected by running automated tests.

โปรเจ็กต์นี้เป็นชุดทดสอบสำหรับเว็บแอปพลิเคชัน Baenpun ที่ใช้ Playwright ซึ่งจะช่วยให้มั่นใจได้ว่าเว็บแอปพลิเคชันทำงานได้ตามที่คาดหวังโดยการทดสอบอัตโนมัติ

## เวอร์ชั้น
|  | Version  |
|--|--|
|**node.js**| v20.15.0 |
|**playwirght**|1.46.1|
|**PHP**| 8.3.10|
 
  Version 

## สารบัญ
### It must be installed. สิ่งที่ต้องติดตั้ง
- node.js
- npm install
- wsl
- php
- mysql
- ubuntu

## Installation and Setup

### 1. Clone the Repository

 1. โคลนทดสอบเว็บแบ่งปั๋น
To get started, clone the repository to your local machine:
```bash
git clone https://github.com/makonsen/baenpun-web-test.git
```

 2. โคลนเว็บไซต์แบ่งปั๋น
โคลนแบ่งปั๋นตามลิ้งค์ด้านล่าง
https://github.com/padillareyj/baengpun-web?tab=readme-ov-file

### 2. Install Dependencies
Navigate to the project directory and install the necessary dependencies using npm:
```bash
cd baenpun-web-test
npm install
```

### 3. Run Tests
To run the Playwright tests, use the following command:

**Runing tests รันทุกเทส**
```bash
npx playwright test 
```
**Run only tests รันเฉพาะเทส**

    npx playwright test [ File Path ]
    
  **Run tests in UI mode**

    npx playwright test  --ui
