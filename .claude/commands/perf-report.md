# /perf-report

Run K6 performance tests and generate an AI-interpreted summary report.

## Usage
```
/perf-report [login|employee|all] [--vus N] [--duration Xs]
```

## Examples
```
/perf-report                           # Run all scenarios with defaults
/perf-report login --vus 20            # Login API with 20 concurrent users
/perf-report employee --duration 2m    # Employee API for 2 minutes
```

## Instructions

When invoked with `$ARGUMENTS`:

1. **Check k6 is installed**:
   ```bash
   k6 version
   ```
   If not found, instruct: `brew install k6` or `choco install k6`.

2. **Create the reports directory**:
   ```bash
   mkdir -p reports/performance
   ```

3. **Run the appropriate K6 scenario(s)** based on `$ARGUMENTS`:
   - `login` → `k6 run tests/performance/login.k6.js`
   - `employee` → `k6 run tests/performance/employee.k6.js`
   - `all` (default) → run both sequentially

   Apply `--vus` and `--duration` overrides if provided.

4. **Parse the JSON summary** from `reports/performance/*-summary.json`.

5. **Interpret the results** against the defined thresholds:
   - `p(95) < 2000ms` — response time SLA
   - `error_rate < 1%` — reliability target
   - Compare against any previous run if available

6. **Present a clear performance verdict**:
   ```
   📊 Login API Performance — PASSED ✅
      p50:  245ms   p95:  890ms   p99: 1,234ms
      Error rate: 0.2%   Throughput: 8.4 req/s
      All thresholds: ✅ PASSED

   📊 Employee CRUD — WARNING ⚠️
      p50:  1,102ms  p95: 2,890ms  p99: 4,100ms  ← p95 breached 2s threshold
      Error rate: 0.8%
      Threshold breach: employee_create_duration p(95) = 2890 > 2000ms
      Recommendation: Investigate employee creation latency — likely DB indexing issue
   ```

7. **Open the HTML report** if running locally:
   ```bash
   open reports/performance/login-report.html
   ```
