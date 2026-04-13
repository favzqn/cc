import { test, expect } from '../../../src/fixtures/base.fixture';
import { allure } from 'allure-playwright';
import { LoginPage } from '../../../src/pages/login.page';

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
  const essPassword = 'Admin1234!';

  test.beforeAll(async ({ apiClient }) => {
    const ess = await apiClient.createEmployee({
      firstName: 'ESSRole',
      lastName: `Test${Date.now()}`,
    });
    essEmpNumber = ess.empNumber;

    essUsername = `ess_${Date.now()}`;
    essUserId = await apiClient.createSystemUser({
      userRoleId: 2,
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
    await allure.epic('RBAC');
    await allure.feature('Admin Role');
    await allure.story('Admin accesses User Management');

    await userManagementPage.goto();

    await allure.step('Verify User Management page is accessible', async () => {
      await expect(page).toHaveURL(/admin\/viewSystemUsers/);
      await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
    });
  });

  test('Admin user sees Admin module in navigation @rbac @regression', async ({ page }) => {
    await allure.epic('RBAC');
    await allure.feature('Admin Role');
    await allure.story('Admin navigation visibility');

    await page.goto('/web/index.php/dashboard/index');
    await page.waitForLoadState('networkidle');

    await allure.step('Verify Admin menu item is present for Admin role', async () => {
      await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    });
  });

  test('Unauthenticated request to Admin API returns 401 @rbac @regression @security', async ({
    browser,
  }) => {
    await allure.epic('RBAC');
    await allure.feature('ESS Role Restrictions');
    await allure.story('Unauthenticated access blocked');

    const unauthContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });

    await allure.step('Access admin users endpoint without session', async () => {
      const response = await unauthContext.request.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users'
      );
      expect(response.status()).toBe(401);
    });

    await unauthContext.close();
  });

  test('Unauthenticated user is redirected to login from admin UI @rbac @regression', async ({
    browser,
  }) => {
    await allure.epic('RBAC');
    await allure.feature('ESS Role Restrictions');
    await allure.story('Admin UI redirect when unauthenticated');

    const unauthContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const unauthPage = await unauthContext.newPage();

    await allure.step('Navigate to Admin panel without session', async () => {
      await unauthPage.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
      await expect(unauthPage).toHaveURL(/auth\/login/);
    });

    await unauthContext.close();
  });

  test('ESS user cannot access Admin features @rbac @regression', async ({ browser }) => {
    await allure.epic('RBAC');
    await allure.feature('ESS Role Restrictions');
    await allure.story('ESS user has no admin access');

    const essContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const essPage = await essContext.newPage();

    try {
      const loginPage = new LoginPage(essPage);

      await allure.step('Log in as ESS user', async () => {
        await loginPage.goto();
        await loginPage.login({ username: essUsername, password: essPassword });
        await essPage.waitForURL(/dashboard/, { timeout: 20_000 });
      });

      await allure.step('Verify Admin menu item is absent from sidebar', async () => {
        await expect(essPage.getByRole('link', { name: 'Admin' })).not.toBeVisible();
      });

      await allure.step('Verify admin actions are blocked on direct URL navigation', async () => {
        await essPage.goto('/web/index.php/admin/viewSystemUsers', { waitUntil: 'networkidle' });
        // ESS users cannot perform admin actions — Add button must be absent
        await expect(essPage.getByRole('button', { name: 'Add' })).not.toBeVisible({ timeout: 5_000 });
      });
    } finally {
      await essContext.close();
    }
  });
});
