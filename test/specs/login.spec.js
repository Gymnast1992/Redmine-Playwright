const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/login.page");
const username = "qmaks19";
const password = "TestID007";
const successDelete = "Your account has been permanently deleted.";
const errorMessage = "Invalid user or password";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.redmine.org/login");
  });

  test("should login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
    await expect(page.locator("a.logout")).toHaveText("Sign out");
  });

  test("TC03, The user should not be able to sign in with no password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithNoPassword(username);
    await expect(page.locator('[id="flash_error"]')).toHaveText(errorMessage);
  });

  test("TC04, The user should be able to Sign Out", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
    await loginPage.signOut();
    await expect(loginPage.btnSignIn).toBeVisible();
  });

  test("TC05, The user should be able to delete existing account", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);
    await loginPage.goToMyAccount();
    await loginPage.deleteAccount();
    await expect(page.locator('[id="flash_notice"]')).toHaveText(successDelete);
  });
});
