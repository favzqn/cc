# /flaky-check

Detect flaky tests by running a test multiple times and analyzing the pattern with Claude AI.

## Usage
```
/flaky-check [test-name] [--runs N]
```

## Examples
```
/flaky-check                                          # Analyze existing allure-results history
/flaky-check employee-lifecycle --runs 5             # Run a specific test 5 times
/flaky-check @smoke --runs 3                         # Run all smoke tests 3 times each
```

## Instructions

When invoked with `$ARGUMENTS`:

1. **Parse arguments** — extract test name/tag and `--runs N` (default: 3).

2. **If a test name or tag is specified**, run it N times and collect results:
   ```bash
   for i in 1 2 3; do
     npx playwright test $TEST --reporter=json --output=reports/run-$i.json
   done
   ```

3. **If no test name**, read existing `allure-results/` for historical data.

4. **Build a TestRunResult array** from the results:
   ```json
   [
     { "testName": "should create employee", "results": ["passed", "failed", "passed"] },
     ...
   ]
   ```

5. **Use `AITestHelper.detectFlakyTests()`** — or if the API key is not set, apply heuristic:
   - Flaky: mixed pass/fail with no code change between runs
   - Unstable: >20% failure rate over 5+ runs
   - Stable: 100% pass rate

6. **Output a prioritized flaky report**:
   ```
   🔴 HIGH   employee-lifecycle: "should create employee"
              Pattern: intermittent (2/5 fail)
              Likely cause: timing — page spinner not fully hidden before click
              Fix: add explicit wait for networkidle in addEmployee.save()

   🟡 MEDIUM login.spec: "should logout successfully"
              Pattern: timing-sensitive (1/5 fail)
              Fix: use waitForURL after logout click
   ```

7. **For each high-priority flaky test**, offer to apply the suggested fix.

8. **Update `reports/flaky-analysis.json`** with findings.
