# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/employee/employee-rbac.spec.ts >> Role-Based Access Control >> Admin user sees Admin module in navigation @rbac @regression
- Location: tests/e2e/employee/employee-rbac.spec.ts:75:7

# Error details

```
TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
```

# Test source

```ts
  1   | import { test, expect } from '../../../src/fixtures/base.fixture';
  2   | import { allure } from 'allure-playwright';
  3   | import { LoginPage } from '../../../src/pages/login.page';
  4   | import { config } from '../../../src/config/env.config';
  5   | import {
  6   |   HTTP_STATUS,
  7   |   TIMEOUTS,
  8   |   ROUTES,
  9   |   API_ENDPOINTS,
  10  |   USER_ROLES,
  11  |   TEST_PASSWORDS,
  12  |   URL_PATTERNS,
  13  |   ALLURE,
  14  |   UI_ELEMENTS,
  15  |   WAIT_STATES,
  16  | } from '../../../src/config/test-constants';
  17  | 
  18  | /**
  19  |  * Role-Based Access Control Validation
  20  |  *
  21  |  * Tests:
  22  |  * - Admin role can access all system areas
  23  |  * - ESS user cannot see or use admin features
  24  |  * - Unauthenticated users are blocked from admin endpoints
  25  |  *
  26  |  * @group rbac
  27  |  * @group regression
  28  |  */
  29  | test.describe('Role-Based Access Control', () => {
  30  |   test.describe.configure({ mode: 'serial' });
  31  | 
  32  |   let essEmpNumber: number;
  33  |   let essUserId: number;
  34  |   let essUsername: string;
  35  |   const essPassword = TEST_PASSWORDS.ESS_USER;
  36  | 
  37  |   test.beforeAll(async ({ apiClient }) => {
  38  |     const ess = await apiClient.createEmployee({
  39  |       firstName: 'ESSRole',
  40  |       lastName: `Test${Date.now()}`,
  41  |     });
  42  |     essEmpNumber = ess.empNumber;
  43  | 
  44  |     essUsername = `ess_${Date.now()}`;
  45  |     essUserId = await apiClient.createSystemUser({
  46  |       userRoleId: USER_ROLES.ESS.ID,
  47  |       employeeId: essEmpNumber,
  48  |       username: essUsername,
  49  |       password: essPassword,
  50  |       status: true,
  51  |     });
  52  |   });
  53  | 
  54  |   test.afterAll(async ({ apiClient }) => {
  55  |     if (essUserId) await apiClient.deleteSystemUser(essUserId).catch(() => {});
  56  |     if (essEmpNumber) await apiClient.deleteEmployee([essEmpNumber]).catch(() => {});
  57  |   });
  58  | 
  59  |   test('Admin user has access to User Management @rbac @regression', async ({
  60  |     userManagementPage,
  61  |     page,
  62  |   }) => {
  63  |     await allure.epic(ALLURE.EPIC.RBAC);
  64  |     await allure.feature(ALLURE.FEATURE.ADMIN_ROLE);
  65  |     await allure.story('Admin accesses User Management');
  66  | 
  67  |     await userManagementPage.goto();
  68  | 
  69  |     await allure.step('Verify User Management page is accessible', async () => {
  70  |       await expect(page).toHaveURL(URL_PATTERNS.ADMIN_USERS);
  71  |       await expect(page.getByRole('button', { name: UI_ELEMENTS.BUTTONS.ADD })).toBeVisible();
  72  |     });
  73  |   });
  74  | 
  75  |   test('Admin user sees Admin module in navigation @rbac @regression', async ({ page }) => {
  76  |     await allure.epic(ALLURE.EPIC.RBAC);
  77  |     await allure.feature(ALLURE.FEATURE.ADMIN_ROLE);
  78  |     await allure.story('Admin navigation visibility');
  79  | 
  80  |     await page.goto(ROUTES.DASHBOARD);
> 81  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
      |                ^ TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
  82  | 
  83  |     await allure.step('Verify Admin menu item is present for Admin role', async () => {
  84  |       await expect(page.getByRole('link', { name: UI_ELEMENTS.LINKS.ADMIN })).toBeVisible();
  85  |     });
  86  |   });
  87  | 
  88  |   test('Unauthenticated request to Admin API returns 401 @rbac @regression @security', async ({
  89  |     browser,
  90  |   }) => {
  91  |     await allure.epic(ALLURE.EPIC.RBAC);
  92  |     await allure.feature(ALLURE.FEATURE.ESS_ROLE_RESTRICTIONS);
  93  |     await allure.story('Unauthenticated access blocked');
  94  | 
  95  |     const unauthContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  96  | 
  97  |     await allure.step('Access admin users endpoint without session', async () => {
  98  |       const response = await unauthContext.request.get(
  99  |         `${config.apiBaseUrl}${API_ENDPOINTS.ADMIN.USERS}`
  100 |       );
  101 |       expect(response.status()).toBe(HTTP_STATUS.UNAUTHORIZED);
  102 |     });
  103 | 
  104 |     await unauthContext.close();
  105 |   });
  106 | 
  107 |   test('Unauthenticated user is redirected to login from admin UI @rbac @regression', async ({
  108 |     browser,
  109 |   }) => {
  110 |     await allure.epic(ALLURE.EPIC.RBAC);
  111 |     await allure.feature(ALLURE.FEATURE.ESS_ROLE_RESTRICTIONS);
  112 |     await allure.story('Admin UI redirect when unauthenticated');
  113 | 
  114 |     const unauthContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  115 |     const unauthPage = await unauthContext.newPage();
  116 | 
  117 |     await allure.step('Navigate to Admin panel without session', async () => {
  118 |       await unauthPage.goto(`${config.baseUrl}${ROUTES.ADMIN.USER_MANAGEMENT}`);
  119 |       await expect(unauthPage).toHaveURL(URL_PATTERNS.LOGIN);
  120 |     });
  121 | 
  122 |     await unauthContext.close();
  123 |   });
  124 | 
  125 |   test('ESS user cannot access Admin features @rbac @regression', async ({ browser }) => {
  126 |     await allure.epic(ALLURE.EPIC.RBAC);
  127 |     await allure.feature(ALLURE.FEATURE.ESS_ROLE_RESTRICTIONS);
  128 |     await allure.story('ESS user has no admin access');
  129 | 
  130 |     const essContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
  131 |     const essPage = await essContext.newPage();
  132 | 
  133 |     try {
  134 |       const loginPage = new LoginPage(essPage);
  135 | 
  136 |       await allure.step('Log in as ESS user', async () => {
  137 |         await loginPage.goto();
  138 |         await loginPage.login({ username: essUsername, password: essPassword });
  139 |         await essPage.waitForURL(URL_PATTERNS.DASHBOARD, { timeout: TIMEOUTS.LONG });
  140 |       });
  141 | 
  142 |       await allure.step('Verify Admin menu item is absent from sidebar', async () => {
  143 |         await expect(essPage.getByRole('link', { name: UI_ELEMENTS.LINKS.ADMIN })).not.toBeVisible();
  144 |       });
  145 | 
  146 |       await allure.step('Verify admin actions are blocked on direct URL navigation', async () => {
  147 |         await essPage.goto(ROUTES.ADMIN.USER_MANAGEMENT, { waitUntil: WAIT_STATES.NETWORK_IDLE });
  148 |         // ESS users cannot perform admin actions — Add button must be absent
  149 |         await expect(essPage.getByRole('button', { name: UI_ELEMENTS.BUTTONS.ADD })).not.toBeVisible({ timeout: TIMEOUTS.SHORT });
  150 |       });
  151 |     } finally {
  152 |       await essContext.close();
  153 |     }
  154 |   });
  155 | });
  156 | 
```