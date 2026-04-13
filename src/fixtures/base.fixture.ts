import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { EmployeeListPage } from '../pages/employee/employee-list.page';
import { AddEmployeePage } from '../pages/employee/add-employee.page';
import { EditEmployeePage } from '../pages/employee/edit-employee.page';
import { UserManagementPage } from '../pages/admin/user-management.page';
import { OrangeHRMApiClient } from '../utils/api-client';
import { AITestHelper } from '../utils/ai-helper';
import { TestDataFactory } from '../utils/test-data';
import { config } from '../config/env.config';

export interface TestFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  employeeListPage: EmployeeListPage;
  addEmployeePage: AddEmployeePage;
  editEmployeePage: EditEmployeePage;
  userManagementPage: UserManagementPage;
  apiClient: OrangeHRMApiClient;
  aiHelper: AITestHelper;
  testData: typeof TestDataFactory;
  /** Push empNumbers here — they'll be deleted via API after the test */
  empCleanup: number[];
}

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },

  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },

  editEmployeePage: async ({ page }, use) => {
    await use(new EditEmployeePage(page));
  },

  userManagementPage: async ({ page }, use) => {
    await use(new UserManagementPage(page));
  },

  apiClient: async ({ request }, use) => {
    const client = new OrangeHRMApiClient(request);
    await client.authenticate();
    await use(client);
  },

  aiHelper: async ({}, use) => {
    await use(new AITestHelper());
  },

  testData: async ({}, use) => {
    await use(TestDataFactory);
  },

  empCleanup: async ({ apiClient }, use) => {
    const empNumbers: number[] = [];
    await use(empNumbers);
    if (empNumbers.length > 0) {
      try {
        await apiClient.deleteEmployee(empNumbers);
        console.log(`[Cleanup] Deleted employees: ${empNumbers.join(', ')}`);
      } catch (error) {
        console.warn(`[Cleanup] Failed to delete employees: ${error}`);
      }
    }
  },
});

/**
 * Test with automatic AI failure analysis.
 *
 * Wraps every test in an afterEach that fires only on failure.
 * If ANTHROPIC_API_KEY is set, sends the error + URL to Claude Sonnet
 * and logs an actionable diagnosis to the console (visible in CI logs).
 */
export const testWithAI = test.extend<TestFixtures>({
  // Override the page fixture to hook into test outcome
  page: async ({ page }, use, testInfo) => {
    await use(page);

    if (testInfo.status === 'failed' && config.anthropicApiKey) {
      const helper = new AITestHelper();
      const lastError = testInfo.errors[0];
      try {
        const diagnosis = await helper.analyzeFailure({
          testName: testInfo.title,
          error: lastError?.message ?? 'Unknown error',
          stack: lastError?.stack,
          url: page.url(),
          lastAction: testInfo.annotations
            .filter(a => a.type === 'last_action')
            .map(a => a.description)
            .at(-1),
        });
        console.log(`\n[AI Diagnosis] ${testInfo.title}\n${diagnosis}\n`);
      } catch {
        // AI analysis is best-effort — never fail the test run because of it
      }
    }
  },
});

export { expect };
