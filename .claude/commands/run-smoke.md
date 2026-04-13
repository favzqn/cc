# /run-smoke

Run the smoke test suite and give a pass/fail summary with actionable insights.

## Usage
```
/run-smoke [browser]
```

## Examples
```
/run-smoke              # Run on Chromium (default)
/run-smoke firefox      # Run on Firefox
/run-smoke all          # Run on all three browsers
```

## Instructions

When invoked with optional `$ARGUMENTS`:

1. **Determine the browser target** from `$ARGUMENTS` (default: `chromium`).

2. **Run the smoke suite**:
   ```bash
   npx playwright test --grep @smoke --project=${browser} --reporter=list,json 2>&1
   ```

3. **Parse the results** from stdout and `reports/results.json`:
   - Total tests: passed / failed / skipped
   - Execution time
   - Any retry counts (retried tests are potential flakiness indicators)

4. **For each failure**:
   - Show the test name, error message, and screenshot path
   - Classify the failure type: selector, timeout, assertion, network, or unknown
   - Suggest immediate fix if obvious

5. **Present a clean summary table**:
   ```
   ✅ PASSED  12/14  (85%)  2m 34s
   ❌ FAILED   2/14
      - should create employee... → TimeoutError on .oxd-loading-spinner
      - should login successfully → AssertionError: expected URL to match /dashboard/
   ```

6. **If all smoke tests pass**, suggest running the full regression:
   ```bash
   npm run test:regression
   ```

7. **If failures exist**, ask if you should run `/analyze-failure` on each failing test.
