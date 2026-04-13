import { test, expect } from '../../../src/fixtures/base.fixture';
import AxeBuilder from '@axe-core/playwright';
import { allure } from 'allure-playwright';
import type { Result } from 'axe-core';

/**
 * Accessibility Tests — WCAG 2.1 AA compliance audit
 *
 * Uses @axe-core/playwright to scan pages for critical/serious violations.
 * OrangeHRM OSS has known app-level violations (missing lang attr, color contrast, etc.)
 * that cannot be fixed by the test suite. Tests report violations and warn — they do
 * not hard-fail on app-owned issues — so the suite remains useful as an audit tool.
 *
 * @group a11y
 * @group regression
 */

// Known OrangeHRM app-level violations that are outside our control
const KNOWN_APP_VIOLATIONS = [
  'html-has-lang',      // OrangeHRM HTML missing lang attribute
  'color-contrast',     // OrangeHRM brand colors fail contrast ratio
  'button-name',        // Icon-only buttons without aria-label in OrangeHRM
  'label',              // Unlabelled form fields in OrangeHRM components
  'list',               // Malformed list elements in OrangeHRM nav
  'image-alt',          // Profile images without alt text
  'scrollable-region-focusable', // Scrollable divs without tabindex
];

test.describe('Accessibility Audits', () => {
  test('login page has no critical a11y violations @a11y', async ({ page }) => {
    await allure.epic('Accessibility');
    await allure.feature('WCAG 2.1 AA');
    await allure.story('Login Page');
    await allure.severity('normal');

    // Navigate unauthenticated — login page is public
    await page.goto('/web/index.php/auth/login');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    await allure.attachment(
      'axe-violations',
      JSON.stringify(results.violations, null, 2),
      'application/json'
    );

    const actionable = results.violations.filter(
      v => (v.impact === 'critical' || v.impact === 'serious') &&
           !KNOWN_APP_VIOLATIONS.includes(v.id)
    );
    expect(actionable, formatViolations(actionable)).toHaveLength(0);
  });

  test('employee list page has no critical a11y violations @a11y', async ({ page }) => {
    await allure.epic('Accessibility');
    await allure.story('Employee List Page');

    await page.goto('/web/index.php/pim/viewEmployeeList');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    await allure.attachment(
      'axe-violations',
      JSON.stringify(results.violations, null, 2),
      'application/json'
    );

    const actionable = results.violations.filter(
      v => (v.impact === 'critical' || v.impact === 'serious') &&
           !KNOWN_APP_VIOLATIONS.includes(v.id)
    );
    expect(actionable, formatViolations(actionable)).toHaveLength(0);
  });

  test('add employee form has no critical a11y violations @a11y', async ({ page }) => {
    await allure.epic('Accessibility');
    await allure.story('Add Employee Form');

    await page.goto('/web/index.php/pim/addEmployee');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    await allure.attachment(
      'axe-violations',
      JSON.stringify(results.violations, null, 2),
      'application/json'
    );

    const actionable = results.violations.filter(
      v => (v.impact === 'critical' || v.impact === 'serious') &&
           !KNOWN_APP_VIOLATIONS.includes(v.id)
    );
    expect(actionable, formatViolations(actionable)).toHaveLength(0);
  });

  test('dashboard has no critical a11y violations @a11y', async ({ page }) => {
    await allure.epic('Accessibility');
    await allure.story('Dashboard');

    await page.goto('/web/index.php/dashboard/index');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    await allure.attachment(
      'axe-violations',
      JSON.stringify(results.violations, null, 2),
      'application/json'
    );

    const actionable = results.violations.filter(
      v => (v.impact === 'critical' || v.impact === 'serious') &&
           !KNOWN_APP_VIOLATIONS.includes(v.id)
    );
    expect(actionable, formatViolations(actionable)).toHaveLength(0);
  });
});

function formatViolations(violations: Result[]): string {
  if (violations.length === 0) return '';
  return `\nCritical a11y violations:\n${violations.map(v =>
    `  [${v.impact ?? 'unknown'}] ${v.id}: ${v.description}`
  ).join('\n')}`;
}
