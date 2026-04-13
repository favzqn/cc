import { test as setup, expect } from '@playwright/test';
import { config } from '../src/config/env.config';
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
  await page.goto('/web/index.php/auth/login');

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Username' }).fill(config.adminUser);
  await page.getByRole('textbox', { name: 'Password' }).fill(config.adminPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/dashboard/index', { timeout: 30_000 });
  await expect(page.locator('.oxd-topbar-header-breadcrumb')).toBeVisible();

  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  await page.context().storageState({ path: authFile });
  console.log(`[Setup] Auth state saved to ${authFile}`);
});
