import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { TIMEOUTS } from '../../config/test-constants';

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
  private readonly addButton = () => this.buttonByName('Add');
  private readonly searchUsernameInput = () => this.inputByLabel('Username');
  private readonly searchButton = () => this.buttonByName('Search');

  // ── Add User form ───────────────────────────────────────────────────────────
  private readonly userRoleDropdown = () => this.dropdownByLabel('User Role');
  private readonly statusDropdown = () => this.dropdownByLabel('Status');
  private readonly employeeNameInput = () => this.inputByLabel('Employee Name');
  private readonly usernameInput = () => this.inputByLabel('Username').last();
  private readonly passwordInput = () => this.getPasswordInput('first');
  private readonly confirmPasswordInput = () => this.getPasswordInput('last');
  private readonly saveButton = () => this.buttonByName('Save');

  // ── Table row scoped selectors ──────────────────────────────────────────────
  private readonly confirmDeleteButton = () => this.buttonByName('Yes, Delete');
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
    await expect(row).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
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
