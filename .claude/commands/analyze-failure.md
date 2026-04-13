# /analyze-failure

Diagnose a failing Playwright test using AI + live browser inspection via MCP.

## Usage
```
/analyze-failure <test-name-or-file>
```

## Examples
```
/analyze-failure employee-lifecycle
/analyze-failure tests/e2e/auth/login.spec.ts
/analyze-failure "should create employee with login credentials"
```

## Instructions

When invoked with `$ARGUMENTS`:

1. **Find the failing test** — search `reports/results.json` or `allure-results/` for recent failures matching `$ARGUMENTS`. If no report exists, run the test first:
   ```bash
   npx playwright test $ARGUMENTS --reporter=json 2>&1
   ```

2. **Extract failure context**:
   - Error message and stack trace
   - Screenshot path from `reports/artifacts/`
   - Last action before failure
   - URL at time of failure

3. **Read the screenshot** if available using the Read tool (images are supported).

4. **Use the MCP Chrome DevTools** if available to navigate to the failing page and inspect the live DOM:
   - `mcp__chrome-devtools__navigate_page` → go to the failing URL
   - `mcp__chrome-devtools__take_snapshot` → capture DOM state
   - `mcp__chrome-devtools__list_console_messages` → check for JS errors

5. **Analyze the failure** using the patterns in `src/utils/ai-helper.ts`:
   - Is this a selector issue? Check if the locator still matches in the DOM snapshot.
   - Is this a timing issue? Look for `timeout` in the error.
   - Is this a data issue? Check if the employee/user already existed.
   - Is this an environment issue? Check network requests for 4xx/5xx.

6. **Suggest a fix** with:
   - Root cause (1 sentence)
   - Specific code change (show the diff)
   - Prevention strategy

7. **Optionally apply the fix** if the user confirms.
