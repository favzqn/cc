# /generate-test

Generate a new Playwright test spec for a given OrangeHRM feature or scenario.

## Usage
```
/generate-test <description>
```

## Examples
```
/generate-test Leave Management — apply and approve leave request
/generate-test Recruitment — post a job vacancy and shortlist a candidate
/generate-test Time & Attendance — clock in and clock out
```

## Instructions

When this command is invoked with a `$ARGUMENTS` description:

1. **Read the existing patterns** — read `tests/e2e/employee/employee-lifecycle.spec.ts` and `src/pages/base.page.ts` to understand the conventions.

2. **Identify the relevant OrangeHRM module** from `$ARGUMENTS` and determine:
   - The URL path for this module
   - The key user actions to automate
   - Which tags apply (`@smoke`, `@regression`, etc.)

3. **Generate a Page Object** in `src/pages/{module}/` following the `BasePage` pattern:
   - All locators as arrow function methods
   - ARIA-first locator strategy (`getByRole`, `getByLabel`)
   - Smart wait wrappers via `BasePage` methods

4. **Generate the test spec** in `tests/e2e/{module}/` following the fixture-based pattern:
   - Import from `src/fixtures/base.fixture`
   - Use `allure` annotations (`epic`, `feature`, `story`, `severity`)
   - Include `@smoke` and `@regression` tagged tests
   - Add `empCleanup` or equivalent cleanup
   - Use `TestDataFactory` for test data

5. **Register the new page** in `src/fixtures/base.fixture.ts`.

6. **Output a summary** of files created and how to run the new tests.

Generate production-quality code — no TODOs, no placeholder comments.
