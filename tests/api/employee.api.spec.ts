import { test, expect } from '../../src/fixtures/base.fixture';
import { allure } from 'allure-playwright';
import { TestDataFactory } from '../../src/utils/test-data';
import { config } from '../../src/config/env.config';

/** Shape of the employee object returned by OrangeHRM API v2 */
interface EmployeeApiData {
  empNumber: number;
  employeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  terminationId: null | number;
}

/**
 * Employee API Tests — direct REST API validation.
 *
 * These tests bypass the UI and verify the API layer independently.
 * Serves as a contract test suite to detect backend regressions.
 *
 * @group api
 * @group smoke
 */
test.describe('Employee API', () => {
  test('POST /pim/employees — create employee returns 200 with empNumber @api @smoke', async ({
    apiClient,
    empCleanup,
  }) => {
    await allure.epic('API');
    await allure.feature('Employee CRUD API');
    await allure.story('Create Employee');
    await allure.severity('critical');

    const employee = TestDataFactory.employee();

    const result = await apiClient.createEmployee({
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
    });

    expect(result.empNumber).toBeDefined();
    expect(typeof result.empNumber).toBe('number');
    expect(result.empNumber).toBeGreaterThan(0);

    empCleanup.push(result.empNumber);
  });

  test('GET /pim/employees/:id — retrieve created employee @api @smoke', async ({
    apiClient,
    empCleanup,
  }) => {
    await allure.epic('API');
    await allure.feature('Employee CRUD API');
    await allure.story('Get Employee');

    const employee = TestDataFactory.employee();
    const { empNumber } = await apiClient.createEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
    empCleanup.push(empNumber);

    const fetched = await apiClient.getEmployee(empNumber) as unknown as EmployeeApiData;

    expect(fetched.firstName).toBe(employee.firstName);
    expect(fetched.lastName).toBe(employee.lastName);
  });

  test('PUT /pim/employees/:id — update employee personal details @api @regression', async ({
    apiClient,
    empCleanup,
  }) => {
    await allure.epic('API');
    await allure.feature('Employee CRUD API');
    await allure.story('Update Employee');

    const employee = TestDataFactory.employee();
    const { empNumber } = await apiClient.createEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
    empCleanup.push(empNumber);

    const updated = await apiClient.updateEmployee(empNumber, {
      firstName: employee.firstName,
      middleName: 'Updated',
      lastName: employee.lastName,
    }) as unknown as EmployeeApiData;

    expect(updated.middleName).toBe('Updated');
  });

  test('DELETE /pim/employees — delete employee removes from system @api @smoke', async ({
    apiClient,
  }) => {
    await allure.epic('API');
    await allure.feature('Employee CRUD API');
    await allure.story('Delete Employee');
    await allure.severity('critical');

    const employee = TestDataFactory.employee();
    const { empNumber } = await apiClient.createEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });

    await apiClient.deleteEmployee([empNumber]);

    // Verify deletion — API throws for non-existent employee
    await expect(apiClient.getEmployee(empNumber)).rejects.toThrow();
  });

  test('GET /pim/employees — search by name returns correct results @api @regression', async ({
    apiClient,
    empCleanup,
  }) => {
    await allure.epic('API');
    await allure.feature('Employee Search API');

    const uniqueName = `UniqueSearch${Date.now()}`;
    const { empNumber } = await apiClient.createEmployee({
      firstName: uniqueName,
      lastName: 'Findme',
    });
    empCleanup.push(empNumber);

    const result = await apiClient.searchEmployees({ name: uniqueName });
    expect(result.total).toBeGreaterThanOrEqual(1);

    const match = (result.data as unknown as EmployeeApiData[]).find(e => e.firstName === uniqueName);
    expect(match).toBeDefined();
  });

  test('API returns 401 when session cookie is absent @api @security', async ({
    browser,
  }) => {
    await allure.epic('API Security');
    await allure.feature('Authentication');

    // Make an API call with NO cookies (fresh unauthenticated context)
    const unauthContext = await browser.newContext({ storageState: { cookies: [], origins: [] } });
    const unauthRequest = unauthContext.request;

    const response = await unauthRequest.get(`${config.apiBaseUrl}/pim/employees`);
    expect(response.status()).toBe(401);
    await unauthContext.close();
  });

  test('API returns 404 for non-existent employee @api @regression', async ({ apiClient }) => {
    await allure.epic('API');
    await allure.feature('Error Handling');

    await expect(apiClient.getEmployee(999999999)).rejects.toThrow();
  });
});
