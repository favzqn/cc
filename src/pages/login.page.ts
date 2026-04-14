import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { TIMEOUTS } from '../config/test-constants';

export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * LoginPage — handles authentication flows.
 *
 * Locators use accessible roles and labels (ARIA-first strategy)
 * for resilience against markup changes.
 */
export class LoginPage extends BasePage {
  // Locators — ARIA-first, then component class names for OrangeHRM-specific elements
  private readonly usernameInput = () => this.page.getByRole('textbox', { name: 'Username' });
  private readonly passwordInput = () => this.page.getByRole('textbox', { name: 'Password' });
  private readonly loginButton = () => this.page.getByRole('button', { name: 'Login' });
  private readonly userDropdown = () => this.page.locator('.oxd-userdropdown-tab');
  private readonly logoutMenuItem = () => this.page.getByRole('menuitem', { name: 'Logout' });
  private readonly errorAlert = () => this.page.locator('.oxd-alert-content-text');
  private readonly brandLogo = () => this.page.getByRole('img', { name: 'company-branding' });
  private readonly fieldErrorMessage = () => this.page.locator('.oxd-input-field-error-message');
  private readonly loginCard = () => this.page.locator('.orangehrm-login-slot');
  private readonly versionText = () => this.page.locator('.orangehrm-copyright');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/auth/login');
  }

  async login(credentials: LoginCredentials): Promise<void> {
    await this.usernameInput().fill(credentials.username);
    await this.passwordInput().fill(credentials.password);
    await this.loginButton().click();
  }

  async loginAs(credentials: LoginCredentials): Promise<void> {
    await this.goto();
    await this.login(credentials);
    await this.waitForUrl('**/dashboard/index');
  }

  async logout(): Promise<void> {
    await this.userDropdown().click();
    await this.logoutMenuItem().click();
    await this.waitForUrl('**/auth/login');
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.errorAlert()).toContainText(message, { timeout: TIMEOUTS.MEDIUM });
  }

  async expectValidationError(): Promise<void> {
    await expect(this.fieldErrorMessage()).toBeVisible({ timeout: TIMEOUTS.SHORT });
  }

  async expectPageVisible(): Promise<void> {
    await expect(this.brandLogo()).toBeVisible();
    await expect(this.loginButton()).toBeEnabled();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.page.url().includes('dashboard');
  }

  getLoginCard() {
    return this.loginCard();
  }

  getVersionText() {
    return this.versionText();
  }
}
