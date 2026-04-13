import { test, expect } from '../../../src/fixtures/base.fixture';
import { allure } from 'allure-playwright';
import { config } from '../../../src/config/env.config';

/**
 * @group auth
 * @group smoke
 */
test.describe('Authentication', () => {
  test.use({ storageState: { cookies: [], origins: [] } }); // Force unauthenticated state

  test('should login successfully with valid admin credentials @smoke', async ({
    loginPage,
    page,
  }) => {
    await allure.epic('Authentication');
    await allure.feature('Login');
    await allure.story('Valid Credentials');
    await allure.severity('critical');

    await loginPage.goto();
    await loginPage.expectPageVisible();

    await allure.step('Enter credentials', async () => {
      await loginPage.login({ username: config.adminUser, password: config.adminPassword });
    });

    await allure.step('Verify dashboard loaded', async () => {
      // Demo server can be slow — use generous timeout
      await page.waitForURL(/dashboard|pim|admin/, { timeout: 30_000 });
      await expect(page.locator('.oxd-topbar')).toBeVisible({ timeout: 10_000 });
    });
  });

  test('should show error with invalid password @smoke', async ({ loginPage }) => {
    await allure.epic('Authentication');
    await allure.feature('Login');
    await allure.story('Invalid Credentials');

    await loginPage.goto();
    await loginPage.login({ username: config.adminUser, password: 'wrong_password' });
    await loginPage.expectLoginError('Invalid credentials');
  });

  test('should show validation for empty username @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login({ username: '', password: config.adminPassword });
    await loginPage.expectValidationError();
  });

  test('should show validation for empty password @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login({ username: config.adminUser, password: '' });
    await loginPage.expectValidationError();
  });

  test('should redirect to login when accessing protected page unauthenticated @smoke', async ({
    page,
  }) => {
    await page.goto('/web/index.php/pim/viewEmployeeList');
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('should logout successfully @regression', async ({ loginPage, page }) => {
    await loginPage.loginAs({ username: config.adminUser, password: config.adminPassword });
    await loginPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
  });
});
