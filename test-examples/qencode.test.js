const { test } = require("../fixture");
const { expect } = require("@playwright/test");


test("Test Qencode Login", async ({ page }, testInfo) => {
  try {

    await page.evaluate((_) => {},
    `browserstack_executor: ${JSON.stringify({ action: "setSessionName", arguments: { name: testInfo.project.name } })}`);
    await page.waitForTimeout(5000);


    const QENCODE_EMAIL = process.env.QENCODE_EMAIL;
    const QENCODE_PASSWORD = process.env.QENCODE_PASSWORD;

    if (!QENCODE_EMAIL) {
      throw new Error('Please define the QENCODE_EMAIL environment variable');
    }

    if (!QENCODE_PASSWORD) {
      throw new Error('Please define the QENCODE_PASSWORD environment variable');
    }

    await page.goto("https://cloud.qencode.com/", {
      waitUntil: "networkidle",
    });

    //await page.goto('https://cloud.qencode.com/');
    await page.getByRole('link', { name: 'Sign In' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*login/);

    await page.locator('#login_email').click();
    await page.locator('#login_email').fill(QENCODE_EMAIL);
    await page.locator('#login_password').click();
    await page.locator('#login_password').fill(QENCODE_PASSWORD);

    await page.getByRole('button', { name: 'Sign In' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*dashboard/);    

    await page.evaluate((_) => {},
    `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: "passed", reason: "User logged in" } })}`);

  } catch (error) {
    console.log(error);
    await page.evaluate((_) => {},
    `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: "failed", reason: "Test failed" } })}`);
  }


}); 