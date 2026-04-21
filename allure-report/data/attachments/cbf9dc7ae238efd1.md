# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.ts >> authenticate as admin
- Location: tests/auth.setup.ts:16:6

# Error details

```
Test timeout of 60000ms exceeded.
```

```
TimeoutError: page.goto: Timeout 60000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "networkidle"

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - img "company-branding" [ref=e8]
    - generic [ref=e9]:
      - heading "Login" [level=5] [ref=e10]
      - generic [ref=e11]:
        - generic [ref=e13]:
          - paragraph [ref=e14]: "Username : Admin"
          - paragraph [ref=e15]: "Password : admin123"
        - generic [ref=e16]:
          - generic [ref=e18]:
            - generic [ref=e19]:
              - generic [ref=e20]: 
              - generic [ref=e21]: Username
            - textbox "Username" [active] [ref=e23]
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]: 
              - generic [ref=e28]: Password
            - textbox "Password" [ref=e30]
          - button "Login" [ref=e32] [cursor=pointer]
          - paragraph [ref=e34] [cursor=pointer]: Forgot your password?
      - generic [ref=e35]:
        - generic [ref=e36]:
          - link [ref=e37] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=e40] [cursor=pointer]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=e43] [cursor=pointer]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=e46] [cursor=pointer]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=e49]:
          - paragraph [ref=e50]: OrangeHRM OS 5.8
          - paragraph [ref=e51]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=e52] [cursor=pointer]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - generic [ref=e53]:
    - img "orangehrm-logo"
```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | import { config } from '../src/config/env.config';
  3  | import { TIMEOUTS, WAIT_STATES } from '../src/config/test-constants';
  4  | import * as fs from 'fs';
  5  | import * as path from 'path';
  6  | 
  7  | /**
  8  |  * Authentication Setup
  9  |  *
  10 |  * Runs before all browser-based tests to establish authenticated session.
  11 |  * Saves storage state so subsequent tests skip the login step entirely.
  12 |  */
  13 | 
  14 | const authFile = path.join(__dirname, '../src/.auth/admin.json');
  15 | 
  16 | setup('authenticate as admin', async ({ page }) => {
  17 |   // OrangeHRM demo site can be very slow - use extended timeout and wait for network idle
> 18 |   await page.goto('/web/index.php/auth/login', { 
     |              ^ TimeoutError: page.goto: Timeout 60000ms exceeded.
  19 |     waitUntil: WAIT_STATES.NETWORK_IDLE,
  20 |     timeout: 60_000 // Extended timeout for slow demo site
  21 |   });
  22 | 
  23 |   await expect(page.getByRole('button', { name: 'Login' })).toBeVisible({ timeout: TIMEOUTS.LONG });
  24 | 
  25 |   // Add timeout to login form interactions for slow demo site
  26 |   await page.getByRole('textbox', { name: 'Username' }).fill(config.adminUser, { timeout: 30_000 });
  27 |   await page.getByRole('textbox', { name: 'Password' }).fill(config.adminPassword, { timeout: 30_000 });
  28 |   await page.getByRole('button', { name: 'Login' }).click({ timeout: 30_000 });
  29 | 
  30 |   // Wait for redirect to dashboard (successful login) - demo site can be slow
  31 |   await page.waitForURL(/dashboard|pim|admin/, { timeout: 60_000 });
  32 | 
  33 |   await expect(page.locator('.oxd-topbar-header-breadcrumb')).toBeVisible();
  34 | 
  35 |   const authDir = path.dirname(authFile);
  36 |   if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
  37 | 
  38 |   await page.context().storageState({ path: authFile });
  39 |   console.log(`[Setup] Auth state saved to ${authFile}`);
  40 | });
  41 | 
```