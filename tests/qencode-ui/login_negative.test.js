const { test } = require("../../fixture");
const { expect } = require("@playwright/test");

test("Test Qencode Login Failure due to wrong password", async ({ page }, testInfo) => {  

  try {

    await page.evaluate((_) => {},
    `browserstack_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
    await page.waitForTimeout(5000);

    const QENCODE_EMAIL = process.env.QENCODE_EMAIL;
    const QENCODE_PASSWORD = process.env.QENCODE_WRONG_PASSWORD;

    if (!QENCODE_EMAIL) {
      throw new Error('Please define the QENCODE_EMAIL environment variable');
    }

    if (!QENCODE_PASSWORD) {
      throw new Error('Please define the QENCODE_WRONG_PASSWORD environment variable');
    }

    await page.goto("https://cloud.qencode.com/", {
      waitUntil: "networkidle",
    });

    // Check the project name to determine if the test is running on a mobile device
    if (testInfo.project.name.includes('browserstack-mobile')) {
      // Code for mobile device, e.g. opening hamburger menu
      await page.getByRole('navigation').getByRole('button').click();
      await page.waitForTimeout(1000); // Adjust as needed
    }
    
    await page.getByRole('link', { name: 'Sign In' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*login/);

    await page.locator('#login_email').fill(QENCODE_EMAIL);
    await page.locator('#login_password').fill(QENCODE_PASSWORD);    

    await page.getByRole('button', { name: 'Sign In' }).click();

    // Wait for the "Invalid Email or Password" text to appear on the page
    await page.waitForSelector('text=Invalid Email or Password');    

    await page.evaluate((_) => {},
    `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: "passed", reason: "User login failed" } })}`);
  } catch (error) {
    console.log(error);
    await page.evaluate((_) => {},
    `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: "failed", reason: "Test failed" } })}`);    
  }

}); 