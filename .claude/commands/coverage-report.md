# /coverage-report

Analyze test coverage across OrangeHRM modules and identify untested areas.

## Usage
```
/coverage-report
```

## Instructions

When invoked:

1. **Scan all test files** in `tests/` to build a coverage map:
   - Which OrangeHRM modules have tests?
   - Which tags are covered (`@smoke`, `@regression`, `@api`)?
   - How many tests per module?

2. **Scan all Page Objects** in `src/pages/` to see what's been modelled.

3. **Cross-reference against known OrangeHRM modules**:
   ```
   ✅ Authentication         (6 tests — @smoke, @regression)
   ✅ Employee Management    (9 tests — @smoke, @regression, @api)
   ✅ User Management/RBAC   (4 tests — @rbac)
   ❌ Leave Management       (0 tests — no POM)
   ❌ Time & Attendance       (0 tests — no POM)
   ❌ Recruitment             (0 tests — no POM)
   ❌ Performance Appraisals  (0 tests — no POM)
   ❌ Reports                 (0 tests — no POM)
   ⚠️  Admin > Config          (0 tests — POM exists but no spec)
   ```

4. **Calculate coverage metrics**:
   - Module coverage: X / total OrangeHRM modules
   - Smoke coverage: % of critical paths covered
   - API coverage: % of REST endpoints tested

5. **Prioritize gaps** based on business risk:
   - High risk: Authentication, Employee CRUD, Leave
   - Medium risk: Recruitment, Time tracking
   - Low risk: Reports, Configuration

6. **Suggest next tests to write** — for each uncovered high-risk area,
   offer to run `/generate-test <module>` to scaffold tests automatically.

7. **Output a coverage summary table** and overall health score.
