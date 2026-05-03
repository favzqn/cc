# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/accessibility/a11y.spec.ts >> Accessibility Audits >> login page has no critical a11y violations @a11y
- Location: tests/e2e/accessibility/a11y.spec.ts:31:7

# Error details

```
TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary [ref=e4]:
      - navigation "Sidepanel" [ref=e5]:
        - generic [ref=e6]:
          - link "client brand banner" [ref=e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e9]
          - text: 
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]:
              - textbox "Search" [ref=e15]
              - button "" [ref=e16] [cursor=pointer]:
                - generic [ref=e17]: 
            - separator [ref=e18]
          - list [ref=e19]:
            - listitem [ref=e20]:
              - link "Admin" [ref=e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e24]: Admin
            - listitem [ref=e25]:
              - link "PIM" [ref=e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e40]: PIM
            - listitem [ref=e41]:
              - link "Leave" [ref=e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e45]: Leave
            - listitem [ref=e46]:
              - link "Time" [ref=e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e53]: Time
            - listitem [ref=e54]:
              - link "Recruitment" [ref=e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e61]: Recruitment
            - listitem [ref=e62]:
              - link "My Info" [ref=e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e69]: My Info
            - listitem [ref=e70]:
              - link "Performance" [ref=e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e79]: Performance
            - listitem [ref=e80]:
              - link "Dashboard" [ref=e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e84]: Dashboard
            - listitem [ref=e85]:
              - link "Directory" [ref=e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e89]: Directory
            - listitem [ref=e90]:
              - link "Maintenance" [ref=e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e95]: Maintenance
            - listitem [ref=e96]:
              - link "Claim" [ref=e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e100]
                - generic [ref=e104]: Claim
            - listitem [ref=e105]:
              - link "Buzz" [ref=e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e109]: Buzz
    - banner [ref=e110]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - text: 
          - heading "Dashboard" [level=6] [ref=e114]
        - link "Upgrade" [ref=e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e117] [cursor=pointer]: Upgrade
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125] [cursor=pointer]:
              - img "profile picture" [ref=e126]
              - paragraph [ref=e127]: manda user
              - generic [ref=e128]: 
      - navigation "Topbar Menu" [ref=e130]:
        - list [ref=e131]:
          - button "" [ref=e133] [cursor=pointer]:
            - generic [ref=e134]: 
  - generic [ref=e135]:
    - generic [ref=e137]:
      - generic [ref=e139]:
        - generic [ref=e141]:
          - generic [ref=e142]: 
          - paragraph [ref=e143]: Time at Work
        - separator [ref=e144]
        - generic [ref=e146]:
          - generic [ref=e147]:
            - img "profile picture" [ref=e149]
            - generic [ref=e150]:
              - paragraph [ref=e151]: Punched In
              - paragraph [ref=e152]: "Punched In: Today at 12:10 PM (GMT 7)"
          - generic [ref=e153]:
            - generic [ref=e154]: 0h 25m Today
            - button "" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: 
          - separator [ref=e157]
          - generic [ref=e158]:
            - generic [ref=e159]:
              - paragraph [ref=e160]: This Week
              - paragraph [ref=e161]: Apr 27 - May 03
            - generic [ref=e162]:
              - generic [ref=e163]: 
              - paragraph [ref=e164]: 0h 0m
      - generic [ref=e168]:
        - generic [ref=e170]:
          - generic [ref=e171]: 
          - paragraph [ref=e172]: My Actions
        - separator [ref=e173]
        - generic [ref=e175]:
          - img "No Content" [ref=e176]
          - paragraph [ref=e177]: No Pending Actions to Perform
      - generic [ref=e179]:
        - generic [ref=e181]:
          - generic [ref=e182]: 
          - paragraph [ref=e183]: Quick Launch
        - separator [ref=e184]
        - generic [ref=e186]:
          - generic [ref=e187]:
            - button "Assign Leave" [ref=e188] [cursor=pointer]
            - generic "Assign Leave" [ref=e191]:
              - paragraph [ref=e192]: Assign Leave
          - generic [ref=e193]:
            - button "Leave List" [ref=e194] [cursor=pointer]
            - generic "Leave List" [ref=e201]:
              - paragraph [ref=e202]: Leave List
          - generic [ref=e203]:
            - button "Timesheets" [ref=e204] [cursor=pointer]
            - generic "Timesheets" [ref=e210]:
              - paragraph [ref=e211]: Timesheets
          - generic [ref=e212]:
            - button "Apply Leave" [ref=e213] [cursor=pointer]
            - generic "Apply Leave" [ref=e216]:
              - paragraph [ref=e217]: Apply Leave
          - generic [ref=e218]:
            - button "My Leave" [ref=e219] [cursor=pointer]
            - generic "My Leave" [ref=e224]:
              - paragraph [ref=e225]: My Leave
          - generic [ref=e226]:
            - button "My Timesheet" [ref=e227] [cursor=pointer]
            - generic "My Timesheet" [ref=e230]:
              - paragraph [ref=e231]: My Timesheet
      - generic [ref=e233]:
        - generic [ref=e235]:
          - generic [ref=e236]: 
          - paragraph [ref=e237]: Buzz Latest Posts
        - separator [ref=e238]
        - generic [ref=e241]:
          - generic [ref=e242] [cursor=pointer]:
            - img "profile picture" [ref=e244]
            - generic [ref=e245]:
              - paragraph [ref=e246]: manda akhil user
              - paragraph [ref=e247]: 2020-08-10 03:38 AM
          - separator [ref=e248]
          - paragraph [ref=e249]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
      - generic [ref=e251]:
        - generic [ref=e252]:
          - paragraph [ref=e257]: Employees on Leave Today
          - generic [ref=e258] [cursor=pointer]: 
        - separator [ref=e259]
        - generic [ref=e261]:
          - img "No Content" [ref=e262]
          - paragraph [ref=e263]: No Employees are on Leave Today
      - generic [ref=e265]:
        - generic [ref=e267]:
          - generic [ref=e268]: 
          - paragraph [ref=e269]: Employee Distribution by Sub Unit
        - separator [ref=e270]
      - generic [ref=e274]:
        - generic [ref=e276]:
          - generic [ref=e277]: 
          - paragraph [ref=e278]: Employee Distribution by Location
        - separator [ref=e279]
        - list [ref=e284]:
          - listitem [ref=e285] [cursor=pointer]:
            - generic "New York Sales Office" [ref=e287]
          - listitem [ref=e288] [cursor=pointer]:
            - generic "Texas R&D" [ref=e290]
          - listitem [ref=e291] [cursor=pointer]:
            - generic "Unassigned" [ref=e293]
    - generic [ref=e294]:
      - paragraph [ref=e295]: OrangeHRM OS 5.8
      - paragraph [ref=e296]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e297] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from '../../../src/fixtures/base.fixture';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | import { allure } from 'allure-playwright';
  4   | import type { Result } from 'axe-core';
  5   | import { ROUTES, WAIT_STATES, ALLURE, WCAG_TAGS } from '../../../src/config/test-constants';
  6   | 
  7   | /**
  8   |  * Accessibility Tests — WCAG 2.1 AA compliance audit
  9   |  *
  10  |  * Uses @axe-core/playwright to scan pages for critical/serious violations.
  11  |  * OrangeHRM OSS has known app-level violations (missing lang attr, color contrast, etc.)
  12  |  * that cannot be fixed by the test suite. Tests report violations and warn — they do
  13  |  * not hard-fail on app-owned issues — so the suite remains useful as an audit tool.
  14  |  *
  15  |  * @group a11y
  16  |  * @group regression
  17  |  */
  18  | 
  19  | // Known OrangeHRM app-level violations that are outside our control
  20  | const KNOWN_APP_VIOLATIONS = [
  21  |   'html-has-lang',      // OrangeHRM HTML missing lang attribute
  22  |   'color-contrast',     // OrangeHRM brand colors fail contrast ratio
  23  |   'button-name',        // Icon-only buttons without aria-label in OrangeHRM
  24  |   'label',              // Unlabelled form fields in OrangeHRM components
  25  |   'list',               // Malformed list elements in OrangeHRM nav
  26  |   'image-alt',          // Profile images without alt text
  27  |   'scrollable-region-focusable', // Scrollable divs without tabindex
  28  | ];
  29  | 
  30  | test.describe('Accessibility Audits', () => {
  31  |   test('login page has no critical a11y violations @a11y', async ({ page }) => {
  32  |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  33  |     await allure.feature('WCAG 2.1 AA');
  34  |     await allure.story('Login Page');
  35  |     await allure.severity(ALLURE.SEVERITY.NORMAL);
  36  | 
  37  |     // Navigate unauthenticated — login page is public
  38  |     await page.goto(ROUTES.AUTH.LOGIN);
> 39  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
      |                ^ TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
  40  | 
  41  |     const results = await new AxeBuilder({ page })
  42  |       .withTags([...WCAG_TAGS])
  43  |       .analyze();
  44  | 
  45  |     await allure.attachment(
  46  |       'axe-violations',
  47  |       JSON.stringify(results.violations, null, 2),
  48  |       'application/json'
  49  |     );
  50  | 
  51  |     const actionable = results.violations.filter(
  52  |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  53  |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  54  |     );
  55  |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  56  |   });
  57  | 
  58  |   test('employee list page has no critical a11y violations @a11y', async ({ page }) => {
  59  |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  60  |     await allure.story('Employee List Page');
  61  | 
  62  |     await page.goto(ROUTES.PIM.EMPLOYEE_LIST);
  63  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
  64  | 
  65  |     const results = await new AxeBuilder({ page })
  66  |       .withTags(['wcag2a', 'wcag2aa'])
  67  |       .analyze();
  68  | 
  69  |     await allure.attachment(
  70  |       'axe-violations',
  71  |       JSON.stringify(results.violations, null, 2),
  72  |       'application/json'
  73  |     );
  74  | 
  75  |     const actionable = results.violations.filter(
  76  |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  77  |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  78  |     );
  79  |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  80  |   });
  81  | 
  82  |   test('add employee form has no critical a11y violations @a11y', async ({ page }) => {
  83  |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  84  |     await allure.story('Add Employee Form');
  85  | 
  86  |     await page.goto(ROUTES.PIM.ADD_EMPLOYEE);
  87  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
  88  | 
  89  |     const results = await new AxeBuilder({ page })
  90  |       .withTags(['wcag2a', 'wcag2aa'])
  91  |       .analyze();
  92  | 
  93  |     await allure.attachment(
  94  |       'axe-violations',
  95  |       JSON.stringify(results.violations, null, 2),
  96  |       'application/json'
  97  |     );
  98  | 
  99  |     const actionable = results.violations.filter(
  100 |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  101 |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  102 |     );
  103 |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  104 |   });
  105 | 
  106 |   test('dashboard has no critical a11y violations @a11y', async ({ page }) => {
  107 |     await allure.epic(ALLURE.EPIC.ACCESSIBILITY);
  108 |     await allure.story('Dashboard');
  109 | 
  110 |     await page.goto(ROUTES.DASHBOARD);
  111 |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
  112 | 
  113 |     const results = await new AxeBuilder({ page })
  114 |       .withTags(['wcag2a', 'wcag2aa'])
  115 |       .analyze();
  116 | 
  117 |     await allure.attachment(
  118 |       'axe-violations',
  119 |       JSON.stringify(results.violations, null, 2),
  120 |       'application/json'
  121 |     );
  122 | 
  123 |     const actionable = results.violations.filter(
  124 |       v => (v.impact === 'critical' || v.impact === 'serious') &&
  125 |            !KNOWN_APP_VIOLATIONS.includes(v.id)
  126 |     );
  127 |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
  128 |   });
  129 | });
  130 | 
  131 | function formatViolations(violations: Result[]): string {
  132 |   if (violations.length === 0) return '';
  133 |   return `\nCritical a11y violations:\n${violations.map(v =>
  134 |     `  [${v.impact ?? 'unknown'}] ${v.id}: ${v.description}`
  135 |   ).join('\n')}`;
  136 | }
  137 | 
```