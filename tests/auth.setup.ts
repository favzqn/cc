import { test as setup, expect } from '@playwright/test';
import { config } from '../src/config/env.config';
import { TIMEOUTS, WAIT_STATES } from '../src/config/test-constants';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Authentication Setup
 *
 * Runs before all browser-based tests to establish authenticated session.
 * Saves storage state so subsequent tests skip the login step entirely.
 */

const authFile = path.join(__dirname, '../src/.auth/admin.json');

setup('authenticate as admin', async ({ page }) => {
  // OrangeHRM demo site can be very slow - use extended timeout and wait for network idle
  await page.goto('/web/index.php/auth/login', { 
    waitUntil: WAIT_STATES.NETWORK_IDLE,
    timeout: 60_000 // Extended timeout for slow demo site
  });

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible({ timeout: TIMEOUTS.LONG });

  // Add timeout to login form interactions for slow demo site
  await page.getByRole('textbox', { name: 'Username' }).fill(config.adminUser, { timeout: 30_000 });
  await page.getByRole('textbox', { name: 'Password' }).fill(config.adminPassword, { timeout: 30_000 });
  await page.getByRole('button', { name: 'Login' }).click({ timeout: 30_000 });

  // Wait for redirect to dashboard (successful login) - demo site can be slow
  await page.waitForURL(/dashboard|pim|admin/, { timeout: 60_000 });

  await expect(page.locator('.oxd-topbar-header-breadcrumb')).toBeVisible();

  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  await page.context().storageState({ path: authFile });
  console.log(`[Setup] Auth state saved to ${authFile}`);
});
