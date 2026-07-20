# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/employee/employee-lifecycle.spec.ts >> Employee Lifecycle >> 1. Create employee with login credentials @employee @smoke
- Location: tests/e2e/employee/employee-lifecycle.spec.ts:35:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 60000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { BasePage } from '../base.page';
  3  | import { TIMEOUTS } from '../../config/test-constants';
  4  | 
  5  | export interface EmployeeDetails {
  6  |   firstName: string;
  7  |   middleName?: string;
  8  |   lastName: string;
  9  |   employeeId?: string;
  10 |   username?: string;
  11 |   password?: string;
  12 | }
  13 | 
  14 | /**
  15 |  * AddEmployeePage — PIM > Add Employee
  16 |  */
  17 | export class AddEmployeePage extends BasePage {
  18 |   private readonly firstNameInput = () => this.page.locator('input[name="firstName"]');
  19 |   private readonly middleNameInput = () => this.page.locator('input[name="middleName"]');
  20 |   private readonly lastNameInput = () => this.page.locator('input[name="lastName"]');
  21 |   private readonly employeeIdInput = () => this.inputByLabel('Employee Id');
  22 |   // oxd-switch-input: the <span> is the clickable element; the <input> is hidden behind it
  23 |   private readonly createLoginToggle = () =>
  24 |     this.page.locator('.oxd-form-row').filter({ hasText: 'Create Login Details' }).locator('input');
  25 |   private readonly createLoginToggleSpan = () =>
  26 |     this.page.locator('.oxd-form-row').filter({ hasText: 'Create Login Details' }).locator('.oxd-switch-input');
  27 |   private readonly usernameInput = () => this.inputByLabel('Username');
  28 |   private readonly passwordInput = () => this.getPasswordInput('first');
  29 |   private readonly confirmPasswordInput = () => this.getPasswordInput('last');
  30 |   private readonly saveButton = () => this.buttonByName('Save');
  31 | 
  32 |   constructor(page: Page) {
  33 |     super(page);
  34 |   }
  35 | 
  36 |   async goto(): Promise<void> {
  37 |     await this.navigate('/web/index.php/pim/addEmployee');
  38 |   }
  39 | 
  40 |   async fillBasicInfo(employee: EmployeeDetails): Promise<void> {
  41 |     await this.smartFill(this.firstNameInput(), employee.firstName);
  42 |     if (employee.middleName) {
  43 |       await this.smartFill(this.middleNameInput(), employee.middleName);
  44 |     }
  45 |     await this.smartFill(this.lastNameInput(), employee.lastName);
  46 | 
  47 |     if (employee.employeeId) {
  48 |       await this.smartFill(this.employeeIdInput(), employee.employeeId);
  49 |     }
  50 |   }
  51 | 
  52 |   async enableLoginCredentials(username: string, password: string): Promise<void> {
  53 |     const toggle = this.createLoginToggle();
  54 |     const isChecked = await toggle.isChecked();
  55 |     // Click the visible span overlay (the checkbox input itself is pointer-events:none)
  56 |     if (!isChecked) await this.createLoginToggleSpan().click();
  57 | 
  58 |     await this.usernameInput().waitFor({ state: 'visible' });
  59 |     await this.smartFill(this.usernameInput(), username);
  60 |     await this.smartFill(this.passwordInput(), password);
  61 |     await this.smartFill(this.confirmPasswordInput(), password);
  62 |   }
  63 | 
  64 |   async save(): Promise<string> {
  65 |     // URL redirect is the authoritative success signal — toast is best-effort only
  66 |     // (webkit is slower and the toast can auto-dismiss before the assertion runs)
  67 |     const toastPromise = this.expectToast('Successfully Saved').catch(() => {/* toast missed — ok */});
  68 |     await this.safeClick(this.saveButton());
  69 |     await Promise.all([
> 70 |       this.page.waitForURL(/pim\/viewPersonalDetails\/empNumber\/\d+/, { timeout: TIMEOUTS.PAGE_LOAD }),
     |                 ^ Error: page.waitForURL: Test timeout of 60000ms exceeded.
  71 |       toastPromise,
  72 |     ]);
  73 |     const url = this.page.url();
  74 |     const match = url.match(/empNumber\/(\d+)/);
  75 |     return match ? match[1] : '';
  76 |   }
  77 | 
  78 |   async addEmployee(employee: EmployeeDetails): Promise<string> {
  79 |     await this.fillBasicInfo(employee);
  80 |     if (employee.username && employee.password) {
  81 |       await this.enableLoginCredentials(employee.username, employee.password);
  82 |     }
  83 |     return this.save();
  84 |   }
  85 | 
  86 |   async getEmployeeId(): Promise<string> {
  87 |     const value = await this.employeeIdInput().inputValue();
  88 |     return value;
  89 |   }
  90 | }
  91 | 
```