# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/employee/employee-lifecycle.spec.ts >> Employee Lifecycle >> 1. Create employee with login credentials @employee @smoke
- Location: tests/e2e/employee/employee-lifecycle.spec.ts:35:7

# Error details

```
Error: expect(locator).not.toHaveValue(expected) failed

Locator:  locator('input[name="firstName"]')
Expected: not ""
Received: ""
Timeout:  10000ms

Call log:
  - Expect "not toHaveValue" with timeout 10000ms
  - waiting for locator('input[name="firstName"]')
    5 × locator resolved to <input name="firstName" data-v-1f99f73c="" placeholder="First Name" class="oxd-input oxd-input--active orangehrm-firstname"/>
      - unexpected value ""

```

# Test source

```ts
  17  |   city?: string;
  18  |   state?: string;
  19  |   zip?: string;
  20  |   country?: string;
  21  |   mobile?: string;
  22  |   workEmail?: string;
  23  | }
  24  | 
  25  | /**
  26  |  * EditEmployeePage — PIM > Personal Details / Contact Details tabs
  27  |  * Handles all employee update operations across multiple tabs.
  28  |  */
  29  | export class EditEmployeePage extends BasePage {
  30  |   // Tabs
  31  |   private readonly personalDetailsTab = () =>
  32  |     this.page.getByRole('link', { name: 'Personal Details' });
  33  |   private readonly contactDetailsTab = () =>
  34  |     this.page.getByRole('link', { name: 'Contact Details' });
  35  | 
  36  |   // Personal Details — name inputs use name attribute (no accessible label on OrangeHRM)
  37  |   private readonly firstNameInput = () => this.page.locator('input[name="firstName"]');
  38  |   private readonly middleNameInput = () => this.page.locator('input[name="middleName"]');
  39  |   private readonly lastNameInput = () => this.page.locator('input[name="lastName"]');
  40  |   private readonly employeeIdInput = () => this.inputByLabel('Employee Id');
  41  |   private readonly driverLicenseInput = () => this.inputByLabel("Driver's License Number");
  42  |   private readonly dobInput = () => this.inputByLabel('Date of Birth');
  43  |   // Gender: exact role match prevents 'Male' filter from matching the 'Female' sibling
  44  |   private readonly genderMaleRadio = () =>
  45  |     this.page.getByRole('radio', { name: 'Male', exact: true });
  46  |   private readonly genderFemaleRadio = () =>
  47  |     this.page.getByRole('radio', { name: 'Female', exact: true });
  48  |   private readonly nationalityDropdown = () => this.dropdownByLabel('Nationality');
  49  |   private readonly maritalStatusDropdown = () => this.dropdownByLabel('Marital Status');
  50  | 
  51  |   // Contact Details
  52  |   private readonly street1Input = () => this.inputByLabel('Street 1');
  53  |   private readonly cityInput = () => this.inputByLabel('City');
  54  |   private readonly mobileInput = () => this.inputByLabel('Mobile');
  55  |   private readonly workEmailInput = () => this.inputByLabel('Work Email');
  56  | 
  57  |   private readonly saveButtons = () => this.buttonByName('Save');
  58  | 
  59  |   constructor(page: Page) {
  60  |     super(page);
  61  |   }
  62  | 
  63  |   async gotoEmployee(empNumber: string): Promise<void> {
  64  |     await this.navigate(`/web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`);
  65  |   }
  66  | 
  67  |   async updatePersonalDetails(details: PersonalDetails): Promise<void> {
  68  |     await this.safeClick(this.personalDetailsTab());
  69  |     await this.waitForPageReady();
  70  | 
  71  |     if (details.driverLicenseNumber) {
  72  |       await this.smartFill(this.driverLicenseInput(), details.driverLicenseNumber);
  73  |     }
  74  |     if (details.dateOfBirth) {
  75  |       await this.smartFill(this.dobInput(), details.dateOfBirth);
  76  |     }
  77  |     if (details.gender === 'Male') {
  78  |       await this.genderMaleRadio().check({ force: true });
  79  |     } else if (details.gender === 'Female') {
  80  |       await this.genderFemaleRadio().check({ force: true });
  81  |     }
  82  |     if (details.nationality) {
  83  |       await this.selectDropdown(this.nationalityDropdown(), details.nationality);
  84  |     }
  85  |     if (details.maritalStatus) {
  86  |       await this.selectDropdown(this.maritalStatusDropdown(), details.maritalStatus);
  87  |     }
  88  | 
  89  |     // Start listening before click — toast auto-dismisses in ~3s
  90  |     const toastPromise = this.expectToast('Successfully Updated');
  91  |     await this.saveButtons().first().click();
  92  |     await toastPromise;
  93  |   }
  94  | 
  95  |   async updateContactDetails(details: ContactDetails): Promise<void> {
  96  |     await this.safeClick(this.contactDetailsTab());
  97  |     await this.waitForPageReady();
  98  | 
  99  |     if (details.street1) await this.smartFill(this.street1Input(), details.street1);
  100 |     if (details.city) await this.smartFill(this.cityInput(), details.city);
  101 |     if (details.mobile) await this.smartFill(this.mobileInput(), details.mobile);
  102 |     if (details.workEmail) await this.smartFill(this.workEmailInput(), details.workEmail);
  103 | 
  104 |     const toastPromise = this.expectToast('Successfully Updated');
  105 |     await this.saveButtons().first().click();
  106 |     await toastPromise;
  107 |   }
  108 | 
  109 |   async getDisplayedName(): Promise<string> {
  110 |     const firstName = await this.firstNameInput().inputValue();
  111 |     const lastName = await this.lastNameInput().inputValue();
  112 |     return `${firstName} ${lastName}`.trim();
  113 |   }
  114 | 
  115 |   async getDisplayedFirstName(): Promise<string> {
  116 |     // Wait for the SPA to populate the field after navigation
> 117 |     await expect(this.firstNameInput()).not.toHaveValue('', { timeout: TIMEOUTS.MEDIUM });
      |                                             ^ Error: expect(locator).not.toHaveValue(expected) failed
  118 |     return this.firstNameInput().inputValue();
  119 |   }
  120 | 
  121 |   async getDisplayedLastName(): Promise<string> {
  122 |     await expect(this.lastNameInput()).not.toHaveValue('', { timeout: TIMEOUTS.MEDIUM });
  123 |     return this.lastNameInput().inputValue();
  124 |   }
  125 | 
  126 |   async getDisplayedMiddleName(): Promise<string> {
  127 |     // Middle name can be empty — just wait for the field to be visible
  128 |     await this.middleNameInput().waitFor({ state: 'visible' });
  129 |     return this.middleNameInput().inputValue();
  130 |   }
  131 | 
  132 |   async getDisplayedEmployeeId(): Promise<string> {
  133 |     // Employee Id is auto-generated so it will always be non-empty
  134 |     await expect(this.employeeIdInput()).not.toHaveValue('', { timeout: TIMEOUTS.MEDIUM });
  135 |     return this.employeeIdInput().inputValue();
  136 |   }
  137 | }
  138 | 
```