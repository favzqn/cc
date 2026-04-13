import { faker } from '@faker-js/faker';
import { EmployeeDetails } from '../pages/employee/add-employee.page';

/**
 * TestDataFactory — generates realistic, unique test data.
 *
 * Uses @faker-js/faker for human-like names/emails.
 * Each call produces fresh data with a timestamp-based uniqueness suffix
 * to prevent collisions across parallel test workers.
 */
export class TestDataFactory {
  private static workerPrefix = `W${process.env.TEST_WORKER_INDEX ?? '0'}`;

  static employee(overrides: Partial<EmployeeDetails> = {}): EmployeeDetails & { password: string } {
    const ts = Date.now().toString().slice(-5);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const suffix = `${this.workerPrefix}${ts}`;

    return {
      firstName,
      middleName: faker.person.middleName(),
      lastName,
      employeeId: `EMP${suffix}`,
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${ts}`,
      password: 'Test@1234!',
      ...overrides,
    };
  }

  static employeeName(): { firstName: string; lastName: string } {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    };
  }

  static phone(): string {
    return faker.phone.number({ style: 'international' });
  }

  static workEmail(firstName: string, lastName: string): string {
    return faker.internet.email({ firstName, lastName, provider: 'test.orangehrm.com' });
  }

  static address(): { street1: string; city: string; state: string; zip: string } {
    return {
      street1: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
    };
  }

  static dateOfBirth(): string {
    const date = faker.date.birthdate({ min: 25, max: 55, mode: 'age' });
    return `${date.getFullYear()}-${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  /** Returns a past date (license expiry in future) */
  static licenseExpiry(): string {
    const date = faker.date.future({ years: 3 });
    return `${date.getFullYear()}-${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  /** Strong password meeting OrangeHRM requirements */
  static strongPassword(): string {
    return `Qx9!${faker.internet.password({ length: 8, memorable: false })}`;
  }
}
