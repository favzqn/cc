import { test, expect } from '../../../src/fixtures/base.fixture';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../../src/pages/login.page';
import { config } from '../../../src/config/env.config';
import {
  HTTP_STATUS,
  TIMEOUTS,
  ROUTES,
  API_ENDPOINTS,
  USER_ROLES,
  TEST_PASSWORDS,
  URL_PATTERNS,
  ALLURE,
  UI_ELEMENTS,
  WAIT_STATES,
} from '../../../src/config/test-constants';

/**
 * Role-Based Access Control Validation
 *
 * Tests:
 * - Admin role can access all system areas
 * - ESS user cannot see or use admin features
 * - Unauthenticated users are blocked from admin endpoints
 *
 * @group rbac
 * @group regression
 */
test.describe('Role-Based Access Control', () => {
  test.describe.configure({ mode: 'serial' });

  let essEmpNumber: number;
  let essUserId: number;
  let essUsername: string;
  const essPassword = TEST_PASSWORDS.ESS_USER;

  test.beforeAll(async ({ apiClient }) => {
    const ess = await apiClient.createEmployee({
      firstName: 'ESSRole',
      lastName: `Test${Date.now()}`,
    });
    essEmpNumber = ess.empNumber;

    essUsername = `ess_${Date.now()}`;
    essUserId = await apiClient.createSystemUser({
      userRoleId: USER_ROLES.ESS.ID,
      employeeId: essEmpNumber,
      username: essUsername,
      password: essPassword,
      status: true,
    });
  });

  test.afterAll(async ({ apiClient }) => {
    if (essUserId) await apiClient.deleteSystemUser(essUserId).catch(() => {});
    if (essEmpNumber) await apiClient.deleteEmployee([essEmpNumber]).catch(() => {});
  });

  test('Admin user has access to User Management @rbac @regression', async ({
    userManagementPage,
    page,
  }) => {
    await allure.epic(ALLURE.EPIC.RBAC);
    await allure.feature(ALLURE.FEATURE.ADMIN_ROLE);
    await allure.story('Admin accesses User Management');

    await userManagementPage.goto();

    await allure.step('Verify User Management page is accessible', async () => {
      await expect(page).toHaveURL(URL_PATTERNS.ADMIN_USERS);
      await expect(page.getByRole('button', { name: UI_ELEMENTS.BUTTONS.ADD })).toBeVisible();
    });
  });

  test('Admin user sees Admin module in navigation @rbac @regression', async ({ page }) => {
    await allure.epic(ALLURE.EPIC.RBAC);
    await allure.feature(ALLURE.FEATURE.ADMIN_ROLE);
    await allure.story('Admin navigation visibility');

    await page.goto(ROUTES.DASHBOARD);
    await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);

    await allure.step('Verify Admin menu item is present for Admin role', async () => {
      await expect(page.getByRole('link', { name: UI_ELEMENTS.LINKS.ADMIN })).toBeVisible();
    });
  });

  test('Unauthenticated request to Admin API returns 401 @rbac @regression @security', async ({
    browser,
  }) => {
    await allure.epic(ALLURE.EPIC.RBAC);
    await allure.feature(ALLURE.FEATURE.ESS_ROLE_RESTRICTIONS);
    await allure.story('Unauthenticated access blocked');

    const unauthContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });

    await allure.step('Access admin users endpoint without session', async () => {
      const response = await unauthContext.request.get(
        `${config.apiBaseUrl}${API_ENDPOINTS.ADMIN.USERS}`
      );
      expect(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
    });

    await unauthContext.close();
  });

  test('Unauthenticated user is redirected to login from admin UI @rbac @regression', async ({
    browser,
  }) => {
    await allure.epic(ALLURE.EPIC.RBAC);
    await allure.feature(ALLURE.FEATURE.ESS_ROLE_RESTRICTIONS);
    await allure.story('Admin UI redirect when unauthenticated');

    const unauthContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const unauthPage = await unauthContext.newPage();

    await allure.step('Navigate to Admin panel without session', async () => {
      await unauthPage.goto(`${config.baseUrl}${ROUTES.ADMIN.USER_MANAGEMENT}`);
      await expect(unauthPage).toHaveURL(URL_PATTERNS.LOGIN);
    });

    await unauthContext.close();
  });

  test('ESS user cannot access Admin features @rbac @regression', async ({ browser }) => {
    await allure.epic(ALLURE.EPIC.RBAC);
    await allure.feature(ALLURE.FEATURE.ESS_ROLE_RESTRICTIONS);
    await allure.story('ESS user has no admin access');

    const essContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const essPage = await essContext.newPage();

    try {
      const loginPage = new LoginPage(essPage);

      await allure.step('Log in as ESS user', async () => {
        await loginPage.goto();
        await loginPage.login({ username: essUsername, password: essPassword });
        await essPage.waitForURL(URL_PATTERNS.DASHBOARD, { timeout: TIMEOUTS.LONG });
      });

      await allure.step('Verify Admin menu item is absent from sidebar', async () => {
        await expect(essPage.getByRole('link', { name: UI_ELEMENTS.LINKS.ADMIN })).not.toBeVisible();
      });

      await allure.step('Verify admin actions are blocked on direct URL navigation', async () => {
        await essPage.goto(ROUTES.ADMIN.USER_MANAGEMENT, { waitUntil: WAIT_STATES.NETWORK_IDLE });
        // ESS users cannot perform admin actions — Add button must be absent
        await expect(essPage.getByRole('button', { name: UI_ELEMENTS.BUTTONS.ADD })).not.toBeVisible({ timeout: TIMEOUTS.SHORT });
      });
    } finally {
      await essContext.close();
    }
  });
});
