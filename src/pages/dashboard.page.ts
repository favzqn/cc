import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * DashboardPage — main landing page after login.
 * Used by visual regression tests and navigation smoke checks.
 */
export class DashboardPage extends BasePage {
  // ── Layout regions ──────────────────────────────────────────────────────────
  private readonly topbar = () => this.page.locator('.oxd-topbar');
  private readonly sidebar = () => this.page.locator('.oxd-sidepanel');
  private readonly userDropdown = () => this.page.locator('.oxd-userdropdown-tab');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/dashboard/index');
  }

  async waitForTopbar(): Promise<void> {
    await this.topbar().waitFor({ state: 'visible' });
  }

  async waitForSidebar(): Promise<void> {
    await this.sidebar().waitFor({ state: 'visible' });
  }

  getTopbar() {
    return this.topbar();
  }

  getSidebar() {
    return this.sidebar();
  }

  getUserDropdown() {
    return this.userDropdown();
  }
}
