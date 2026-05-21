# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/employee/employee-lifecycle.spec.ts >> Employee Lifecycle >> 3. Update employee personal details @employee @regression
- Location: tests/e2e/employee/employee-lifecycle.spec.ts:98:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 60000ms exceeded.
=========================== logs ===========================
  "load" event fired
  "domcontentloaded" event fired
============================================================
```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | import { TIMEOUTS, WAIT_STATES } from '../config/test-constants';
  3   | 
  4   | /**
  5   |  * BasePage — foundation for all Page Objects.
  6   |  *
  7   |  * Provides:
  8   |  * - Smart waiting wrappers that adapt to network/animation conditions
  9   |  * - Retry-aware interactions to handle transient DOM states
  10  |  * - Consistent screenshot capture
  11  |  * - Accessibility-first locator strategy
  12  |  */
  13  | export abstract class BasePage {
  14  |   protected readonly page: Page;
  15  | 
  16  |   // ── Shared OrangeHRM element locators ─────────────────────────────────────
  17  |   private readonly loadingSpinner = () =>
  18  |     this.page.locator('.oxd-loading-spinner');
  19  |   private dropdownOption = (optionText: string): Locator =>
  20  |     this.page.locator('.oxd-select-option', { hasText: optionText });
  21  |   private autocompleteOption = (optionText: string): Locator =>
  22  |     this.page.locator('.oxd-autocomplete-option', { hasText: optionText });
  23  |   private toastContent = (message: string): Locator =>
  24  |     this.page.locator('.oxd-toast-content', { hasText: message });
  25  | 
  26  |   // ── Reusable locator helpers ──────────────────────────────────────────────
  27  |   /** Get input field within a labeled input group */
  28  |   protected inputByLabel(label: string): Locator {
  29  |     return this.page.locator('.oxd-input-group').filter({ hasText: label }).locator('input');
  30  |   }
  31  | 
  32  |   /** Get dropdown trigger within a labeled input group */
  33  |   protected dropdownByLabel(label: string): Locator {
  34  |     return this.page.locator('.oxd-input-group').filter({ hasText: label }).locator('.oxd-select-text');
  35  |   }
  36  | 
  37  |   /** Get button by accessible name */
  38  |   protected buttonByName(name: string): Locator {
  39  |     return this.page.getByRole('button', { name });
  40  |   }
  41  | 
  42  |   /** Get password input by position (first or last) */
  43  |   protected getPasswordInput(position: 'first' | 'last' = 'first'): Locator {
  44  |     return position === 'first' 
  45  |       ? this.page.locator('input[type="password"]').first()
  46  |       : this.page.locator('input[type="password"]').last();
  47  |   }
  48  | 
  49  |   constructor(page: Page) {
  50  |     this.page = page;
  51  |   }
  52  | 
  53  |   /** Navigate to a path relative to baseURL */
  54  |   async navigate(path: string): Promise<void> {
  55  |     await this.page.goto(path);
  56  |     await this.waitForPageReady();
  57  |   }
  58  | 
  59  |   /** Wait for network idle + no spinners */
  60  |   async waitForPageReady(): Promise<void> {
> 61  |     await this.page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
      |                     ^ Error: page.waitForLoadState: Test timeout of 60000ms exceeded.
  62  |     // Wait for OrangeHRM spinner to disappear
  63  |     if (await this.loadingSpinner().isVisible({ timeout: TIMEOUTS.SHORT }).catch(() => false)) {
  64  |       await this.loadingSpinner().waitFor({ state: 'hidden', timeout: TIMEOUTS.PAGE_LOAD });
  65  |     }
  66  |   }
  67  | 
  68  |   /** Smart fill: clears field before typing, retries on intercept */
  69  |   async smartFill(locator: Locator, value: string): Promise<void> {
  70  |     await locator.waitFor({ state: 'visible' });
  71  |     await locator.clear();
  72  |     await locator.fill(value);
  73  |     // Verify value was applied (some SPA inputs need a nudge)
  74  |     const actual = await locator.inputValue();
  75  |     if (actual !== value) {
  76  |       await locator.clear();
  77  |       await locator.type(value, { delay: 50 });
  78  |     }
  79  |   }
  80  | 
  81  |   /** Dropdown select by visible text — handles OrangeHRM custom dropdowns */
  82  |   async selectDropdown(trigger: Locator, optionText: string): Promise<void> {
  83  |     await trigger.click();
  84  |     await this.dropdownOption(optionText).waitFor({ state: 'visible' });
  85  |     await this.dropdownOption(optionText).click();
  86  |   }
  87  | 
  88  |   /** Autocomplete field interaction */
  89  |   async fillAutocomplete(field: Locator, searchText: string, optionText: string): Promise<void> {
  90  |     await field.fill(searchText);
  91  |     await this.autocompleteOption(optionText).waitFor({ state: 'visible', timeout: TIMEOUTS.MEDIUM });
  92  |     await this.autocompleteOption(optionText).click();
  93  |   }
  94  | 
  95  |   /** Click with retry on element detachment */
  96  |   async safeClick(locator: Locator, options?: { force?: boolean }): Promise<void> {
  97  |     await expect(locator).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  98  |     await locator.click({ ...options });
  99  |   }
  100 | 
  101 |   /** Assert toast notification */
  102 |   async expectToast(message: string): Promise<void> {
  103 |     await expect(this.toastContent(message)).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
  104 |   }
  105 | 
  106 |   /** Wait for a specific URL pattern */
  107 |   async waitForUrl(pattern: string | RegExp): Promise<void> {
  108 |     await this.page.waitForURL(pattern, { timeout: TIMEOUTS.PAGE_LOAD });
  109 |   }
  110 | 
  111 |   /** Capture debug screenshot */
  112 |   async screenshot(name: string): Promise<Buffer> {
  113 |     return this.page.screenshot({ path: `reports/artifacts/${name}.png`, fullPage: true });
  114 |   }
  115 | 
  116 |   /** Generic table row locator by cell text */
  117 |   tableRowWith(text: string): Locator {
  118 |     return this.page.locator('.oxd-table-row', { hasText: text });
  119 |   }
  120 | }
  121 | 
```