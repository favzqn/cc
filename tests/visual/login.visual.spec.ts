import { test, expect } from '../../src/fixtures/base.fixture';
import { LoginPage } from '../../src/pages/login.page';

/**
 * Visual Regression Tests
 *
 * Uses Playwright's built-in screenshot diffing.
 * First run: generates baseline snapshots in tests/visual/__snapshots__/
 * Subsequent runs: diffs against baseline, fails if pixel diff exceeds threshold.
 *
 * Update baselines: npm run test:update-snapshots
 *
 * @group visual
 */

// ── Login page ─────────────────────────────────────────────────────────────────
test.describe('Visual Regression — Login', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login page matches baseline @visual', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Mask version/copyright text only — changes between deployments
    await expect(page).toHaveScreenshot('login-page.png', {
      mask: [loginPage.getVersionText()],
      fullPage: false,
    });
  });

  test('login page dark areas render correctly @visual', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.getLoginCard()).toHaveScreenshot('login-card.png');
  });
});

// ── Dashboard ──────────────────────────────────────────────────────────────────
test.describe('Visual Regression — Dashboard', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.goto();
  });

  test('dashboard header matches baseline @visual', async ({ dashboardPage }) => {
    await dashboardPage.waitForTopbar();
    await expect(dashboardPage.getTopbar()).toHaveScreenshot('dashboard-header.png', {
      mask: [dashboardPage.getUserDropdown()],
      maxDiffPixelRatio: 0.05,
    });
  });

  test('sidebar navigation matches baseline @visual', async ({ dashboardPage }) => {
    await dashboardPage.waitForSidebar();
    await expect(dashboardPage.getSidebar()).toHaveScreenshot('sidebar.png', {
      mask: [dashboardPage.getUserDropdown()],
    });
  });
});
