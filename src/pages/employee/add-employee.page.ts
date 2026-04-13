import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export interface EmployeeDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
  username?: string;
  password?: string;
}

/**
 * AddEmployeePage — PIM > Add Employee
 */
export class AddEmployeePage extends BasePage {
  private readonly firstNameInput = () => this.page.locator('input[name="firstName"]');
  private readonly middleNameInput = () => this.page.locator('input[name="middleName"]');
  private readonly lastNameInput = () => this.page.locator('input[name="lastName"]');
  // Employee Id is in its own oxd-input-group (not shared with name fields)
  private readonly employeeIdInput = () =>
    this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
  // oxd-switch-input: the <span> is the clickable element; the <input> is hidden behind it
  private readonly createLoginToggle = () =>
    this.page.locator('.oxd-form-row').filter({ hasText: 'Create Login Details' }).locator('input');
  private readonly createLoginToggleSpan = () =>
    this.page.locator('.oxd-form-row').filter({ hasText: 'Create Login Details' }).locator('.oxd-switch-input');
  private readonly usernameInput = () =>
    this.page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
  private readonly passwordInput = () =>
    this.page.locator('input[type="password"]').first();
  private readonly confirmPasswordInput = () =>
    this.page.locator('input[type="password"]').last();
  private readonly saveButton = () => this.page.getByRole('button', { name: 'Save' });

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/pim/addEmployee');
  }

  async fillBasicInfo(employee: EmployeeDetails): Promise<void> {
    await this.smartFill(this.firstNameInput(), employee.firstName);
    if (employee.middleName) {
      await this.smartFill(this.middleNameInput(), employee.middleName);
    }
    await this.smartFill(this.lastNameInput(), employee.lastName);

    if (employee.employeeId) {
      await this.smartFill(this.employeeIdInput(), employee.employeeId);
    }
  }

  async enableLoginCredentials(username: string, password: string): Promise<void> {
    const toggle = this.createLoginToggle();
    const isChecked = await toggle.isChecked();
    // Click the visible span overlay (the checkbox input itself is pointer-events:none)
    if (!isChecked) await this.createLoginToggleSpan().click();

    await this.usernameInput().waitFor({ state: 'visible' });
    await this.smartFill(this.usernameInput(), username);
    await this.smartFill(this.passwordInput(), password);
    await this.smartFill(this.confirmPasswordInput(), password);
  }

  async save(): Promise<string> {
    // Start listening for the toast BEFORE clicking — it can appear and dismiss in ~3s
    const toastPromise = this.expectToast('Successfully Saved');
    await this.safeClick(this.saveButton());
    await Promise.all([
      this.page.waitForURL(/pim\/viewPersonalDetails\/empNumber\/\d+/, { timeout: 30_000 }),
      toastPromise,
    ]);
    const url = this.page.url();
    const match = url.match(/empNumber\/(\d+)/);
    return match ? match[1] : '';
  }

  async addEmployee(employee: EmployeeDetails): Promise<string> {
    await this.fillBasicInfo(employee);
    if (employee.username && employee.password) {
      await this.enableLoginCredentials(employee.username, employee.password);
    }
    return this.save();
  }

  async getEmployeeId(): Promise<string> {
    const value = await this.employeeIdInput().inputValue();
    return value;
  }
}
