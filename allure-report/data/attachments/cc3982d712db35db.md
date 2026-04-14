# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.ts >> authenticate as admin
- Location: tests/auth.setup.ts:15:6

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | import { config } from '../src/config/env.config';
  3  | import * as fs from 'fs';
  4  | import * as path from 'path';
  5  | 
  6  | /**
  7  |  * Authentication Setup
  8  |  *
  9  |  * Runs before all browser-based tests to establish authenticated session.
  10 |  * Saves storage state so subsequent tests skip the login step entirely.
  11 |  */
  12 | 
  13 | const authFile = path.join(__dirname, '../src/.auth/admin.json');
  14 | 
  15 | setup('authenticate as admin', async ({ page }) => {
> 16 |   await page.goto('/web/index.php/auth/login');
     |              ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  17 | 
  18 |   await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  19 | 
  20 |   await page.getByRole('textbox', { name: 'Username' }).fill(config.adminUser);
  21 |   await page.getByRole('textbox', { name: 'Password' }).fill(config.adminPassword);
  22 |   await page.getByRole('button', { name: 'Login' }).click();
  23 | 
  24 |   await page.waitForURL('**/dashboard/index', { timeout: 30_000 });
  25 |   await expect(page.locator('.oxd-topbar-header-breadcrumb')).toBeVisible();
  26 | 
  27 |   const authDir = path.dirname(authFile);
  28 |   if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
  29 | 
  30 |   await page.context().storageState({ path: authFile });
  31 |   console.log(`[Setup] Auth state saved to ${authFile}`);
  32 | });
  33 | 
```