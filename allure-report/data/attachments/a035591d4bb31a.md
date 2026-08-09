# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/auth/login.spec.ts >> Authentication >> should login successfully with valid admin credentials @smoke
- Location: tests/e2e/auth/login.spec.ts:13:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Test source

```ts
  1  | import { test, expect } from '../../../src/fixtures/base.fixture';
  2  | import { allure } from 'allure-playwright';
  3  | import { config } from '../../../src/config/env.config';
  4  | import { TIMEOUTS, ROUTES, URL_PATTERNS, ALLURE } from '../../../src/config/test-constants';
  5  | 
  6  | /**
  7  |  * @group auth
  8  |  * @group smoke
  9  |  */
  10 | test.describe('Authentication', () => {
  11 |   test.use({ storageState: { cookies: [], origins: [] } }); // Force unauthenticated state
  12 | 
  13 |   test('should login successfully with valid admin credentials @smoke', async ({
  14 |     loginPage,
  15 |     page,
  16 |   }) => {
  17 |     await allure.epic(ALLURE.EPIC.AUTHENTICATION);
  18 |     await allure.feature(ALLURE.FEATURE.LOGIN_FLOW);
  19 |     await allure.story('Valid Credentials');
  20 |     await allure.severity(ALLURE.SEVERITY.CRITICAL);
  21 | 
  22 |     await loginPage.goto();
  23 |     await loginPage.expectPageVisible();
  24 | 
  25 |     await allure.step('Enter credentials', async () => {
  26 |       await loginPage.login({ username: config.adminUser, password: config.adminPassword });
  27 |     });
  28 | 
  29 |     await allure.step('Verify dashboard loaded', async () => {
  30 |       // Demo server can be slow — use generous timeout
> 31 |       await page.waitForURL(URL_PATTERNS.DASHBOARD, { timeout: TIMEOUTS.PAGE_LOAD });
     |                  ^ TimeoutError: page.waitForURL: Timeout 30000ms exceeded.
  32 |       await expect(page.locator('.oxd-topbar')).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  33 |     });
  34 |   });
  35 | 
  36 |   test('should show error with invalid password @smoke', async ({ loginPage }) => {
  37 |     await allure.epic(ALLURE.EPIC.AUTHENTICATION);
  38 |     await allure.feature(ALLURE.FEATURE.LOGIN_FLOW);
  39 |     await allure.story('Invalid Credentials');
  40 | 
  41 |     await loginPage.goto();
  42 |     await loginPage.login({ username: config.adminUser, password: 'wrong_password' });
  43 |     await loginPage.expectLoginError('Invalid credentials');
  44 |   });
  45 | 
  46 |   test('should show validation for empty username @regression', async ({ loginPage }) => {
  47 |     await loginPage.goto();
  48 |     await loginPage.login({ username: '', password: config.adminPassword });
  49 |     await loginPage.expectValidationError();
  50 |   });
  51 | 
  52 |   test('should show validation for empty password @regression', async ({ loginPage }) => {
  53 |     await loginPage.goto();
  54 |     await loginPage.login({ username: config.adminUser, password: '' });
  55 |     await loginPage.expectValidationError();
  56 |   });
  57 | 
  58 |   test('should redirect to login when accessing protected page unauthenticated @smoke', async ({
  59 |     page,
  60 |   }) => {
  61 |     await page.goto(ROUTES.PIM.EMPLOYEE_LIST);
  62 |     await expect(page).toHaveURL(URL_PATTERNS.LOGIN);
  63 |   });
  64 | 
  65 |   test('should logout successfully @regression', async ({ loginPage, page }) => {
  66 |     await loginPage.loginAs({ username: config.adminUser, password: config.adminPassword });
  67 |     await loginPage.logout();
  68 |     await expect(page).toHaveURL(/auth\/login/);
  69 |   });
  70 | });
  71 | 
```