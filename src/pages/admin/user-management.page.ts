import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export type UserRole = 'Admin' | 'ESS';

export interface SystemUser {
  userRole: UserRole;
  employeeName: string;
  username: string;
  password: string;
  status: 'Enabled' | 'Disabled';
}

/**
 * UserManagementPage — Admin > User Management > Users
 * Handles role-based access control validation and user administration.
 */
export class UserManagementPage extends BasePage {
  // ── Search bar ─────────────────────────────────────────────────────────────
  private readonly addButton = () => this.page.getByRole('button', { name: 'Add' });
  private readonly searchUsernameInput = () =>
    this.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
  private readonly searchButton = () => this.page.getByRole('button', { name: 'Search' });

  // ── Add User form ───────────────────────────────────────────────────────────
  private readonly userRoleDropdown = () =>
    this.page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
  private readonly statusDropdown = () =>
    this.page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
  private readonly employeeNameInput = () =>
    this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input');
  private readonly usernameInput = () =>
    this.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input').last();
  private readonly passwordInput = () =>
    this.page.locator('input[type="password"]').first();
  private readonly confirmPasswordInput = () =>
    this.page.locator('input[type="password"]').last();
  private readonly saveButton = () => this.page.getByRole('button', { name: 'Save' });

  // ── Table row scoped selectors ──────────────────────────────────────────────
  private readonly confirmDeleteButton = () =>
    this.page.getByRole('button', { name: 'Yes, Delete' });
  private rowRoleCell = (row: Locator) =>
    row.locator('.oxd-table-cell').nth(2); // 0=checkbox, 1=username, 2=userRole
  private rowDeleteButton = (row: Locator) =>
    row.locator('button i.bi-trash');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/admin/viewSystemUsers');
  }

  async addUser(user: SystemUser): Promise<void> {
    await this.safeClick(this.addButton());
    await this.waitForUrl('**/admin/saveSystemUser');

    await this.selectDropdown(this.userRoleDropdown(), user.userRole);
    await this.selectDropdown(this.statusDropdown(), user.status);
    // Search by first name only — autocomplete needs partial text to show results
    const firstName = user.employeeName.split(' ')[0];
    await this.fillAutocomplete(this.employeeNameInput(), firstName, user.employeeName);
    await this.smartFill(this.usernameInput(), user.username);
    await this.smartFill(this.passwordInput(), user.password);
    await this.smartFill(this.confirmPasswordInput(), user.password);

    await this.safeClick(this.saveButton());
    await this.expectToast('Successfully Saved');
    await this.waitForUrl('**/admin/viewSystemUsers');
  }

  async searchUser(username: string): Promise<void> {
    await this.smartFill(this.searchUsernameInput(), username);
    await this.safeClick(this.searchButton());
    await this.waitForPageReady();
  }

  async expectUserExists(username: string): Promise<void> {
    const row = this.tableRowWith(username);
    await expect(row).toBeVisible({ timeout: 15_000 });
  }

  async getUserRole(username: string): Promise<string> {
    const row = this.tableRowWith(username);
    return (await this.rowRoleCell(row).textContent()) ?? '';
  }

  async deleteUser(username: string): Promise<void> {
    const row = this.tableRowWith(username);
    await this.rowDeleteButton(row).click();
    await this.confirmDeleteButton().click();
    await this.expectToast('Successfully Deleted');
  }
}
