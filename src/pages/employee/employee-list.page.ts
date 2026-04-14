import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { TIMEOUTS } from '../../config/test-constants';

/**
 * EmployeeListPage — PIM > Employee List
 */
export class EmployeeListPage extends BasePage {
  // ── Search bar ─────────────────────────────────────────────────────────────
  private readonly addEmployeeButton = () => this.buttonByName('Add');
  private readonly searchEmployeeName = () => this.inputByLabel('Employee Name');
  private readonly searchEmployeeId = () => this.inputByLabel('Employee Id');
  private readonly searchButton = () => this.buttonByName('Search');
  private readonly resetButton = () => this.buttonByName('Reset');
  private readonly recordCount = () => this.page.locator('.oxd-text--span', { hasText: 'Record' });
  private readonly noRecordsText = () => this.page.locator('span.oxd-text', { hasText: 'No Records Found' });

  // ── Table row scoped selectors ──────────────────────────────────────────────
  private readonly confirmDeleteButton = () => this.buttonByName('Yes, Delete');
  private employeeRow = (firstName: string, lastName: string): Locator =>
    this.page.locator('.oxd-table-row').filter({ hasText: firstName }).filter({ hasText: lastName });
  private rowDeleteButton = (row: Locator): Locator =>
    row.locator('button i.bi-trash');
  private rowEditButton = (row: Locator): Locator =>
    row.locator('button i.bi-pencil-fill');

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigate('/web/index.php/pim/viewEmployeeList');
  }

  async clickAddEmployee(): Promise<void> {
    await this.safeClick(this.addEmployeeButton());
    await this.waitForUrl('**/pim/addEmployee');
  }

  async searchByName(firstName?: string, lastName?: string): Promise<void> {
    const searchText = [firstName, lastName].filter(Boolean).join(' ');
    if (searchText) {
      await this.smartFill(this.searchEmployeeName(), searchText);
    }
    await this.safeClick(this.searchButton());
    await this.waitForPageReady();
  }

  async searchByEmployeeId(employeeId: string): Promise<void> {
    await this.smartFill(this.searchEmployeeId(), employeeId);
    await this.safeClick(this.searchButton());
    await this.waitForPageReady();
  }

  async resetSearch(): Promise<void> {
    await this.safeClick(this.resetButton());
    await this.waitForPageReady();
  }

  async getResultCount(): Promise<number> {
    const text = await this.recordCount().textContent({ timeout: TIMEOUTS.MEDIUM });
    const match = text?.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async expectEmployeeInResults(firstName: string, lastName: string): Promise<void> {
    await expect(this.employeeRow(firstName, lastName)).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  async expectNoResults(): Promise<void> {
    await expect(this.noRecordsText()).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  async clickDeleteForEmployee(firstName: string, lastName: string): Promise<void> {
    const row = this.employeeRow(firstName, lastName);
    await this.rowDeleteButton(row).click();
    await this.confirmDeleteDialog();
  }

  async clickEditForEmployee(firstName: string, lastName: string): Promise<void> {
    const row = this.employeeRow(firstName, lastName);
    await this.rowEditButton(row).click();
    await this.waitForUrl(/editEmployee/);
  }

  private async confirmDeleteDialog(): Promise<void> {
    await this.confirmDeleteButton().waitFor({ state: 'visible' });
    await this.confirmDeleteButton().click();
    await this.expectToast('Successfully Deleted');
  }
}
