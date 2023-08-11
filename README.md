# Running Playwright tests via BrowserStack

1. Clone this repository
2. Rin `npm istall` to install dependencies
3. Create `.env` file for enviroment variables

```
BROWSERSTACK_USERNAME='your_username'
BROWSERSTACK_ACCESS_KEY='your_access_key'
QENCODE_EMAIL = "qencode_email"
QENCODE_PASSWORD = "qencode_password"
QENCODE_WRONG_PASSWORD = "invalid_qencode_password"
```
4. To run tests via BrowserStack use this command `npx playwright test tests/`

5. Test results will be available here https://automate.browserstack.com/dashboard/v2/builds/

6. Test enviroment is configured in playwright.config.js

```
  projects: [
    {
      name: "chrome@latest:Windows 11@browserstack",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },
    {
      name: "playwright-webkit@latest:OSX Ventura@browserstack",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },  
    {
      name: "chrome@Samsung Galaxy S22:13@browserstack-mobile",
      use: {
        browserName: "chromium",
        channel: "chrome",
      },
    },
  ],
```