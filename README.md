
# Test Baengpun website
This project is a test suite for the Baenpun web application using Playwright. It helps ensure that the web application functions as expected by running automated tests.

## Version
|  | Version  |
|--|--|
|**node.js**| v20.15.0 |
|**playwirght**|1.46.1|
|**PHP**| 8.3.10|


## It must be installed.
- node.js
- npm install
- wsl
- php
- mysql
- ubuntu

## Installation and Setup

### 1. Clone the Repository
To get started, clone the repository to your local machine:
```bash
git clone https://github.com/makonsen/baengpun-web-test.git
```

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
**Run only tests**

    npx playwright test [ File Path ]
    
  **Run tests in UI mode**

    npx playwright test  --ui

View additional usage information
https://playwright.dev/
