# /heal-selectors

Find and fix broken Playwright selectors across the test suite using live DOM inspection.

## Usage
```
/heal-selectors [file-or-page-name]
```

## Examples
```
/heal-selectors                          # Scan all page objects
/heal-selectors src/pages/login.page.ts  # Fix selectors in a specific file
/heal-selectors employee                 # Fix all employee-related pages
```

## Instructions

When invoked (optionally with `$ARGUMENTS`):

1. **Identify target files** — if `$ARGUMENTS` is provided, focus on matching page objects in `src/pages/`. Otherwise scan all `*.page.ts` files.

2. **Extract all locators** from the target files — look for `locator(`, `getByRole(`, `getByLabel(`, `getByText(`, `page.locator(` patterns.

3. **Launch a browser session** via MCP or Playwright to verify each selector:
   - Navigate to the page the POM represents
   - For each locator, attempt `page.locator(selector).count()` to see if it still matches
   - Flag selectors that return 0 matches

4. **For each broken selector**:
   - Use `mcp__chrome-devtools__take_snapshot` to capture the current DOM
   - Find the element by its visual/semantic purpose
   - Propose a more resilient selector using ARIA roles, labels, or accessible text
   - Show the before/after diff

5. **Ask for confirmation** before writing changes, unless `--auto` flag is passed.

6. **Apply approved fixes** using the Edit tool.

7. **Re-run affected tests** to confirm selectors work:
   ```bash
   npx playwright test --grep <affected-test> --project=chromium
   ```

Prefer this selector hierarchy:
1. `getByRole('button', { name: '...' })` — most resilient
2. `getByLabel('...')` — for form inputs
3. `getByText('...')` — for visible content
4. `locator('[data-testid="..."]')` — when test IDs exist
5. CSS class selectors — last resort only
