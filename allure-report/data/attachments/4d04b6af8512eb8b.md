# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/employee/employee-rbac.spec.ts >> Role-Based Access Control >> ESS user cannot access Admin features @rbac @regression
- Location: tests/e2e/employee/employee-rbac.spec.ts:125:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Test source

```ts
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
  81  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
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
> 139 |         await essPage.waitForURL(URL_PATTERNS.DASHBOARD, { timeout: TIMEOUTS.LONG });
      |                       ^ TimeoutError: page.waitForURL: Timeout 20000ms exceeded.
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