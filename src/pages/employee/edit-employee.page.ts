import { Page, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { TIMEOUTS } from '../../config/test-constants';

export interface PersonalDetails {
  driverLicenseNumber?: string;
  licenseExpiryDate?: string;
  nationality?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female';
}

export interface ContactDetails {
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  mobile?: string;
  workEmail?: string;
}

/**
 * EditEmployeePage — PIM > Personal Details / Contact Details tabs
 * Handles all employee update operations across multiple tabs.
 */
export class EditEmployeePage extends BasePage {
  // Tabs
  private readonly personalDetailsTab = () =>
    this.page.getByRole('link', { name: 'Personal Details' });
  private readonly contactDetailsTab = () =>
    this.page.getByRole('link', { name: 'Contact Details' });

  // Personal Details — name inputs use name attribute (no accessible label on OrangeHRM)
  private readonly firstNameInput = () => this.page.locator('input[name="firstName"]');
  private readonly middleNameInput = () => this.page.locator('input[name="middleName"]');
  private readonly lastNameInput = () => this.page.locator('input[name="lastName"]');
  private readonly employeeIdInput = () => this.inputByLabel('Employee Id');
  private readonly driverLicenseInput = () => this.inputByLabel("Driver's License Number");
  private readonly dobInput = () => this.inputByLabel('Date of Birth');
  // Gender: exact role match prevents 'Male' filter from matching the 'Female' sibling
  private readonly genderMaleRadio = () =>
    this.page.getByRole('radio', { name: 'Male', exact: true });
  private readonly genderFemaleRadio = () =>
    this.page.getByRole('radio', { name: 'Female', exact: true });
  private readonly nationalityDropdown = () => this.dropdownByLabel('Nationality');
  private readonly maritalStatusDropdown = () => this.dropdownByLabel('Marital Status');

  // Contact Details
  private readonly street1Input = () => this.inputByLabel('Street 1');
  private readonly cityInput = () => this.inputByLabel('City');
  private readonly mobileInput = () => this.inputByLabel('Mobile');
  private readonly workEmailInput = () => this.inputByLabel('Work Email');

  private readonly saveButtons = () => this.buttonByName('Save');

  constructor(page: Page) {
    super(page);
  }

  async gotoEmployee(empNumber: string): Promise<void> {
    await this.navigate(`/web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`);
  }

  async updatePersonalDetails(details: PersonalDetails): Promise<void> {
    await this.safeClick(this.personalDetailsTab());
    await this.waitForPageReady();

    if (details.driverLicenseNumber) {
      await this.smartFill(this.driverLicenseInput(), details.driverLicenseNumber);
    }
    if (details.dateOfBirth) {
      await this.smartFill(this.dobInput(), details.dateOfBirth);
    }
    if (details.gender === 'Male') {
      await this.genderMaleRadio().check({ force: true });
    } else if (details.gender === 'Female') {
      await this.genderFemaleRadio().check({ force: true });
    }
    if (details.nationality) {
      await this.selectDropdown(this.nationalityDropdown(), details.nationality);
    }
    if (details.maritalStatus) {
      await this.selectDropdown(this.maritalStatusDropdown(), details.maritalStatus);
    }

    // Start listening before click — toast auto-dismisses in ~3s
    const toastPromise = this.expectToast('Successfully Updated');
    await this.saveButtons().first().click();
    await toastPromise;
  }

  async updateContactDetails(details: ContactDetails): Promise<void> {
    await this.safeClick(this.contactDetailsTab());
    await this.waitForPageReady();

    if (details.street1) await this.smartFill(this.street1Input(), details.street1);
    if (details.city) await this.smartFill(this.cityInput(), details.city);
    if (details.mobile) await this.smartFill(this.mobileInput(), details.mobile);
    if (details.workEmail) await this.smartFill(this.workEmailInput(), details.workEmail);

    const toastPromise = this.expectToast('Successfully Updated');
    await this.saveButtons().first().click();
    await toastPromise;
  }

  async getDisplayedName(): Promise<string> {
    const firstName = await this.firstNameInput().inputValue();
    const lastName = await this.lastNameInput().inputValue();
    return `${firstName} ${lastName}`.trim();
  }

  async getDisplayedFirstName(): Promise<string> {
    // Wait for the SPA to populate the field after navigation
    await expect(this.firstNameInput()).not.toHaveValue('', { timeout: TIMEOUTS.MEDIUM });
    return this.firstNameInput().inputValue();
  }

  async getDisplayedLastName(): Promise<string> {
    await expect(this.lastNameInput()).not.toHaveValue('', { timeout: TIMEOUTS.MEDIUM });
    return this.lastNameInput().inputValue();
  }

  async getDisplayedMiddleName(): Promise<string> {
    // Middle name can be empty — just wait for the field to be visible
    await this.middleNameInput().waitFor({ state: 'visible' });
    return this.middleNameInput().inputValue();
  }

  async getDisplayedEmployeeId(): Promise<string> {
    // Employee Id is auto-generated so it will always be non-empty
    await expect(this.employeeIdInput()).not.toHaveValue('', { timeout: TIMEOUTS.MEDIUM });
    return this.employeeIdInput().inputValue();
  }
}
