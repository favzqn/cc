import { test, expect } from '../../../src/fixtures/base.fixture';
import { allure } from 'allure-playwright';
import { config } from '../../../src/config/env.config';
import { TIMEOUTS, ROUTES, URL_PATTERNS, ALLURE } from '../../../src/config/test-constants';

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
    await allure.epic(ALLURE.EPIC.AUTHENTICATION);
    await allure.feature(ALLURE.FEATURE.LOGIN_FLOW);
    await allure.story('Valid Credentials');
    await allure.severity(ALLURE.SEVERITY.CRITICAL);

    await loginPage.goto();
    await loginPage.expectPageVisible();

    await allure.step('Enter credentials', async () => {
      await loginPage.login({ username: config.adminUser, password: config.adminPassword });
    });

    await allure.step('Verify dashboard loaded', async () => {
      // Demo server can be slow — use generous timeout
      await page.waitForURL(URL_PATTERNS.DASHBOARD, { timeout: TIMEOUTS.PAGE_LOAD });
      await expect(page.locator('.oxd-topbar')).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    });
  });

  test('should show error with invalid password @smoke', async ({ loginPage }) => {
    await allure.epic(ALLURE.EPIC.AUTHENTICATION);
    await allure.feature(ALLURE.FEATURE.LOGIN_FLOW);
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
    await page.goto(ROUTES.PIM.EMPLOYEE_LIST);
    await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
  });

  test('should logout successfully @regression', async ({ loginPage, page }) => {
    await loginPage.loginAs({ username: config.adminUser, password: config.adminPassword });
    await loginPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
  });
});
