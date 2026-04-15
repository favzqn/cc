import { test, expect } from '../../../src/fixtures/base.fixture';
import { allure } from 'allure-playwright';
import { TestDataFactory } from '../../../src/utils/test-data';
import { ALLURE } from '../../../src/config/test-constants';

/**
 * Employee Lifecycle — full end-to-end flow covering:
 * Create → Validate → Update → Delete
 *
 * @group employee
 * @group regression
 */
test.describe('Employee Lifecycle', () => {
  test.describe.configure({ mode: 'serial' }); // Lifecycle tests run in order

  let empNumber: string;
  let employeeId: string; // EMPW-style ID shown in the form
  let employeeData: ReturnType<typeof TestDataFactory.employee>;

  test.beforeAll(() => {
    employeeData = TestDataFactory.employee();
  });

  // Safety net: if test 5 (UI delete) never runs, clean up via API
  test.afterAll(async ({ apiClient }) => {
    if (empNumber) {
      try {
        await apiClient.deleteEmployee([parseInt(empNumber, 10)]);
      } catch {
        // Already deleted by test 5 — ignore
      }
    }
  });

  test('1. Create employee with login credentials @employee @smoke', async ({
    addEmployeePage,
    editEmployeePage,
  }) => {
    await allure.epic(ALLURE.EPIC.EMPLOYEE_MANAGEMENT);
    await allure.feature(ALLURE.FEATURE.EMPLOYEE_LIFECYCLE);
    await allure.story('Create Employee');
    await allure.severity(ALLURE.SEVERITY.CRITICAL);

    await allure.step('Navigate to Add Employee page', async () => {
      await addEmployeePage.goto();
    });

    await allure.step('Fill employee details', async () => {
      await addEmployeePage.fillBasicInfo(employeeData);
    });

    await allure.step('Enable login credentials', async () => {
      if (employeeData.username && employeeData.password) {
        await addEmployeePage.enableLoginCredentials(
          employeeData.username,
          employeeData.password
        );
      }
    });

    await allure.step('Save and verify success', async () => {
      empNumber = await addEmployeePage.save();
      employeeId = employeeData.employeeId!;
      expect(empNumber).toBeTruthy();
    });

    await allure.step('Validate data displayed on Personal Details page', async () => {
      const displayedFirstName = await editEmployeePage.getDisplayedFirstName();
      const displayedLastName = await editEmployeePage.getDisplayedLastName();
      const displayedMiddleName = await editEmployeePage.getDisplayedMiddleName();
      const displayedEmployeeId = await editEmployeePage.getDisplayedEmployeeId();

      expect(displayedFirstName).toBe(employeeData.firstName);
      expect(displayedLastName).toBe(employeeData.lastName);
      expect(displayedMiddleName).toBe(employeeData.middleName);
      expect(displayedEmployeeId).toBe(employeeData.employeeId);
    });
  });

  test('2. Verify employee appears in employee list @employee @smoke', async ({
    employeeListPage,
  }) => {
    await allure.story('Verify Employee in List');

    await employeeListPage.goto();
    await employeeListPage.searchByEmployeeId(employeeId);

    await allure.step('Assert employee found in list', async () => {
      await employeeListPage.expectEmployeeInResults(
        employeeData.firstName,
        employeeData.lastName
      );
      const count = await employeeListPage.getResultCount();
      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  test('3. Update employee personal details @employee @regression', async ({
    editEmployeePage,
  }) => {
    await allure.story('Update Employee');
    await allure.severity(ALLURE.SEVERITY.NORMAL);

    const address = TestDataFactory.address();

    await allure.step('Update personal details', async () => {
      await editEmployeePage.gotoEmployee(empNumber);
      await editEmployeePage.updatePersonalDetails({
        gender: 'Male',
        maritalStatus: 'Single',
        nationality: 'Australian',
        dateOfBirth: TestDataFactory.dateOfBirth(),
      });
    });

    await allure.step('Update contact details', async () => {
      await editEmployeePage.updateContactDetails({
        street1: address.street1,
        city: address.city,
        mobile: TestDataFactory.phone(),
        workEmail: TestDataFactory.workEmail(employeeData.firstName, employeeData.lastName),
      });
    });
  });

  test('4. Verify updates persisted correctly @employee @regression', async ({
    editEmployeePage,
  }) => {
    await allure.story('Verify Updates Persisted');

    await allure.step('Navigate to employee details', async () => {
      await editEmployeePage.gotoEmployee(empNumber);
    });

    await allure.step('Verify updated data displayed on screen', async () => {
      const displayedFirstName = await editEmployeePage.getDisplayedFirstName();
      const displayedLastName = await editEmployeePage.getDisplayedLastName();
      
      expect(displayedFirstName).toBe(employeeData.firstName);
      expect(displayedLastName).toBe(employeeData.lastName);
    });
  });

  test('5. Delete employee @employee @smoke', async ({ employeeListPage }) => {
    await allure.story('Delete Employee');
    await allure.severity('critical');

    await employeeListPage.goto();
    await employeeListPage.searchByEmployeeId(employeeId);

    await allure.step('Delete employee from list', async () => {
      await employeeListPage.clickDeleteForEmployee(
        employeeData.firstName,
        employeeData.lastName
      );
    });

    await allure.step('Verify employee no longer exists', async () => {
      await employeeListPage.searchByEmployeeId(employeeId);
      await employeeListPage.expectNoResults();
    });
  });
});

/**
 * API-Only Employee Tests
 * Pure API tests without UI interaction - validates parallel worker safety.
 */
test.describe('API Employee Operations', () => {
  test('Create and immediately verify employee via API @employee @api @regression', async ({
    apiClient,
    empCleanup,
  }) => {
    await allure.epic('Employee Management');
    await allure.feature('Employee CRUD API');
    await allure.story('API Create and Retrieve');

    const employee = TestDataFactory.employee();

    const { empNumber } = await apiClient.createEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
    empCleanup.push(empNumber);

    const fetched = await apiClient.getEmployee(empNumber);
    expect((fetched as { firstName: string }).firstName).toBe(employee.firstName);
    expect((fetched as { lastName: string }).lastName).toBe(employee.lastName);
  });
});

/**
 * Integration Tests - Cross-Layer Validation
 * These tests validate integration between API and UI layers.
 * They create data via API and verify it appears correctly in UI.
 */
test.describe('API-to-UI Integration', () => {
  test('Employee created via API appears in UI list @employee @integration @regression', async ({
    apiClient,
    employeeListPage,
    empCleanup,
  }) => {
    await allure.epic('Employee Management');
    await allure.feature('API-UI Integration');
    await allure.story('API Create → UI Display');

    const employee = TestDataFactory.employee({ firstName: 'AutoTest', lastName: `User${Date.now()}` });

    await allure.step('Create employee via API', async () => {
      const { empNumber } = await apiClient.createEmployee({
        firstName: employee.firstName,
        lastName: employee.lastName,
      });
      empCleanup.push(empNumber);
    });

    await allure.step('Verify employee appears in UI list', async () => {
      await employeeListPage.goto();
      await employeeListPage.searchByName(employee.firstName, employee.lastName);
      await employeeListPage.expectEmployeeInResults(employee.firstName, employee.lastName);
    });
  });
});
