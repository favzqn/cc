# /inspect-app

Use Chrome DevTools MCP to live-inspect the OrangeHRM app and assist with test development.

## Usage
```
/inspect-app <page-or-action>
```

## Examples
```
/inspect-app login                         # Inspect login page DOM for selectors
/inspect-app employee list                 # Inspect employee list page
/inspect-app "add employee form"           # Map all form fields for POM generation
/inspect-app network /pim/employees        # Monitor API calls on employee pages
```

## Instructions

When invoked with `$ARGUMENTS`:

1. **Open a browser** using the Playwright MCP or Chrome DevTools MCP.

2. **Navigate to the relevant page** based on `$ARGUMENTS`:
   - `login` → `/web/index.php/auth/login`
   - `employee list` → `/web/index.php/pim/viewEmployeeList`
   - `add employee` → `/web/index.php/pim/addEmployee`
   - `admin users` → `/web/index.php/admin/viewSystemUsers`
   - Custom URL → navigate directly

3. **If authentication is needed**, use stored credentials from `env.config.ts`.

4. **Capture page state**:
   - `mcp__chrome-devtools__take_screenshot` — visual snapshot
   - `mcp__chrome-devtools__take_snapshot` — DOM snapshot for selector analysis
   - `mcp__chrome-devtools__list_console_messages` — surface JS errors

5. **For form inspection** — identify all interactive elements and suggest POM locators:
   - Input fields → `getByLabel()` or `getByRole('textbox', { name: '...' })`
   - Buttons → `getByRole('button', { name: '...' })`
   - Dropdowns → inspect `.oxd-select-text` pattern
   - Custom components → note OrangeHRM-specific patterns

6. **For network inspection** (`network` keyword in `$ARGUMENTS`):
   - `mcp__chrome-devtools__list_network_requests` — show API calls
   - Identify REST endpoints for the page
   - Suggest corresponding `api-client.ts` methods

7. **Output actionable artifacts**:
   - Suggested locator code for the page
   - API endpoints discovered
   - Any console errors that indicate issues
   - Recommendations for test assertions

This command is ideal for **exploratory testing** and **POM generation** for new modules.
