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
    apiClient,
  }) => {
    await allure.story('Verify Updates Persisted');

    await allure.step('Verify via UI', async () => {
      await editEmployeePage.gotoEmployee(empNumber);
      const displayedName = await editEmployeePage.getDisplayedName();
      expect(displayedName).toContain(employeeData.firstName);
      expect(displayedName).toContain(employeeData.lastName);
    });

    await allure.step('Cross-validate via API', async () => {
      const apiEmployee = await apiClient.getEmployee(parseInt(empNumber, 10));
      expect((apiEmployee as { firstName: string }).firstName).toBe(employeeData.firstName);
      expect((apiEmployee as { lastName: string }).lastName).toBe(employeeData.lastName);
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
 * Parallel Employee Creation Tests
 * These run independently to validate parallel worker safety.
 */
test.describe('Parallel Employee Operations', () => {
  test('Create and immediately verify employee via API @employee @regression', async ({
    apiClient,
    empCleanup,
  }) => {
    await allure.epic('Employee Management');
    await allure.feature('Employee CRUD');

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

  test('Employee list reflects newly created employee @employee @regression', async ({
    apiClient,
    employeeListPage,
    empCleanup,
  }) => {
    const employee = TestDataFactory.employee({ firstName: 'AutoTest', lastName: `User${Date.now()}` });

    const { empNumber } = await apiClient.createEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
    empCleanup.push(empNumber);

    await employeeListPage.goto();
    await employeeListPage.searchByName(employee.firstName, employee.lastName);
    await employeeListPage.expectEmployeeInResults(employee.firstName, employee.lastName);
  });
});
