import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUTS, WAIT_STATES } from '../config/test-constants';

/**
 * BasePage — foundation for all Page Objects.
 *
 * Provides:
 * - Smart waiting wrappers that adapt to network/animation conditions
 * - Retry-aware interactions to handle transient DOM states
 * - Consistent screenshot capture
 * - Accessibility-first locator strategy
 */
export abstract class BasePage {
  protected readonly page: Page;

  // ── Shared OrangeHRM element locators ─────────────────────────────────────
  private readonly loadingSpinner = () =>
    this.page.locator('.oxd-loading-spinner');
  private dropdownOption = (optionText: string): Locator =>
    this.page.locator('.oxd-select-option', { hasText: optionText });
  private autocompleteOption = (optionText: string): Locator =>
    this.page.locator('.oxd-autocomplete-option', { hasText: optionText });
  private toastContent = (message: string): Locator =>
    this.page.locator('.oxd-toast-content', { hasText: message });

  // ── Reusable locator helpers ──────────────────────────────────────────────
  /** Get input field within a labeled input group */
  protected inputByLabel(label: string): Locator {
    return this.page.locator('.oxd-input-group').filter({ hasText: label }).locator('input');
  }

  /** Get dropdown trigger within a labeled input group */
  protected dropdownByLabel(label: string): Locator {
    return this.page.locator('.oxd-input-group').filter({ hasText: label }).locator('.oxd-select-text');
  }

  /** Get button by accessible name */
  protected buttonByName(name: string): Locator {
    return this.page.getByRole('button', { name });
  }

  /** Get password input by position (first or last) */
  protected getPasswordInput(position: 'first' | 'last' = 'first'): Locator {
    return position === 'first' 
      ? this.page.locator('input[type="password"]').first()
      : this.page.locator('input[type="password"]').last();
  }

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a path relative to baseURL */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageReady();
  }

  /** Wait for network idle + no spinners */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
    // Wait for OrangeHRM spinner to disappear
    if (await this.loadingSpinner().isVisible({ timeout: TIMEOUTS.SHORT }).catch(() => false)) {
      await this.loadingSpinner().waitFor({ state: 'hidden', timeout: TIMEOUTS.PAGE_LOAD });
    }
  }

  /** Smart fill: clears field before typing, retries on intercept */
  async smartFill(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
    // Verify value was applied (some SPA inputs need a nudge)
    const actual = await locator.inputValue();
    if (actual !== value) {
      await locator.clear();
      await locator.type(value, { delay: 50 });
    }
  }

  /** Dropdown select by visible text — handles OrangeHRM custom dropdowns */
  async selectDropdown(trigger: Locator, optionText: string): Promise<void> {
    await trigger.click();
    await this.dropdownOption(optionText).waitFor({ state: 'visible' });
    await this.dropdownOption(optionText).click();
  }

  /** Autocomplete field interaction */
  async fillAutocomplete(field: Locator, searchText: string, optionText: string): Promise<void> {
    await field.fill(searchText);
    await this.autocompleteOption(optionText).waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
    await this.autocompleteOption(optionText).click();
  }

  /** Click with retry on element detachment */
  async safeClick(locator: Locator, options?: { force?: boolean }): Promise<void> {
    await expect(locator).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
    await locator.click({ ...options });
  }

  /** Assert toast notification */
  async expectToast(message: string): Promise<void> {
    await expect(this.toastContent(message)).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  }

  /** Wait for a specific URL pattern */
  async waitForUrl(pattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(pattern, { timeout: TIMEOUTS.PAGE_LOAD });
  }

  /** Capture debug screenshot */
  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `reports/artifacts/${name}.png`, fullPage: true });
  }

  /** Generic table row locator by cell text */
  tableRowWith(text: string): Locator {
    return this.page.locator('.oxd-table-row', { hasText: text });
  }
}
