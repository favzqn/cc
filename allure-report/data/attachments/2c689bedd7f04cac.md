# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/accessibility/a11y.spec.ts >> Accessibility Audits >> dashboard has no critical a11y violations @a11y
- Location: tests/e2e/accessibility/a11y.spec.ts:106:7

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
              - paragraph [ref=e151]: Punched Out
              - paragraph [ref=e152]: "Punched Out: Today at 05:00 PM (GMT 5.5)"
          - generic [ref=e153]:
            - generic [ref=e154]: 7h 28m Today
            - button "" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: 
          - separator [ref=e157]
          - generic [ref=e158]:
            - generic [ref=e159]:
              - paragraph [ref=e160]: This Week
              - paragraph [ref=e161]: Jun 01 - Jun 07
            - generic [ref=e162]:
              - generic [ref=e163]: 
              - paragraph [ref=e164]: 4h 52m
      - generic [ref=e168]:
        - generic [ref=e170]:
          - generic [ref=e171]: 
          - paragraph [ref=e172]: My Actions
        - separator [ref=e173]
        - generic [ref=e176]:
          - button [ref=e177] [cursor=pointer]
          - paragraph [ref=e186] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=e188]:
        - generic [ref=e190]:
          - generic [ref=e191]: 
          - paragraph [ref=e192]: Quick Launch
        - separator [ref=e193]
        - generic [ref=e195]:
          - generic [ref=e196]:
            - button "Assign Leave" [ref=e197] [cursor=pointer]
            - generic "Assign Leave" [ref=e200]:
              - paragraph [ref=e201]: Assign Leave
          - generic [ref=e202]:
            - button "Leave List" [ref=e203] [cursor=pointer]
            - generic "Leave List" [ref=e210]:
              - paragraph [ref=e211]: Leave List
          - generic [ref=e212]:
            - button "Timesheets" [ref=e213] [cursor=pointer]
            - generic "Timesheets" [ref=e219]:
              - paragraph [ref=e220]: Timesheets
          - generic [ref=e221]:
            - button "Apply Leave" [ref=e222] [cursor=pointer]
            - generic "Apply Leave" [ref=e225]:
              - paragraph [ref=e226]: Apply Leave
          - generic [ref=e227]:
            - button "My Leave" [ref=e228] [cursor=pointer]
            - generic "My Leave" [ref=e233]:
              - paragraph [ref=e234]: My Leave
          - generic [ref=e235]:
            - button "My Timesheet" [ref=e236] [cursor=pointer]
            - generic "My Timesheet" [ref=e239]:
              - paragraph [ref=e240]: My Timesheet
      - generic [ref=e242]:
        - generic [ref=e244]:
          - generic [ref=e245]: 
          - paragraph [ref=e246]: Buzz Latest Posts
        - separator [ref=e247]
        - generic [ref=e249]:
          - generic [ref=e250]:
            - generic [ref=e251] [cursor=pointer]:
              - img "profile picture" [ref=e253]
              - generic [ref=e254]:
                - paragraph [ref=e255]: manda akhil user
                - paragraph [ref=e256]: 2026-01-06 07:05 AM
            - separator [ref=e257]
            - paragraph [ref=e258]: dfs
          - generic [ref=e259]:
            - generic [ref=e260] [cursor=pointer]:
              - img "profile picture" [ref=e262]
              - generic [ref=e263]:
                - paragraph [ref=e264]: manda akhil user
                - paragraph [ref=e265]: 2020-08-10 03:38 AM
            - separator [ref=e266]
            - paragraph [ref=e267]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
          - generic [ref=e268]:
            - generic [ref=e269] [cursor=pointer]:
              - img "profile picture" [ref=e271]
              - generic [ref=e272]:
                - paragraph [ref=e273]: Sania Shaheen
                - paragraph [ref=e274]: 2020-08-10 03:38 AM
            - separator [ref=e275]
            - paragraph [ref=e276]: "World Championship: What makes the perfect snooker player? Mark Selby: Robertson has one of the best techniques in the game. It is very, very straight and he fully commits to every single shot he plays. John Higgins: Every shot is repetitive. He always keeps the same technique and cues through the ball bang straight. Barry Hawkins: Robertson is textbook with his grip and has a ramrod solid cue action, delivering it in a straight line. Honourable mentions: Shaun Murphy, Ding Junhui, Jack Lisowski."
          - generic [ref=e277]:
            - generic [ref=e278] [cursor=pointer]:
              - img "profile picture" [ref=e280]
              - generic [ref=e281]:
                - paragraph [ref=e282]: Rebecca Harmony
                - paragraph [ref=e283]: 2020-08-10 03:34 AM
            - separator [ref=e284]
            - paragraph [ref=e285]: Throwback Thursdays!!
            - img
          - generic [ref=e286]:
            - generic [ref=e287] [cursor=pointer]:
              - img "profile picture" [ref=e289]
              - generic [ref=e290]:
                - paragraph [ref=e291]: Russel Hamilton
                - paragraph [ref=e292]: 2020-08-10 03:33 AM
            - separator [ref=e293]
            - paragraph [ref=e294]: Live SIMPLY Dream BIG Be GREATFULL Give LOVE Laugh LOT.......
      - generic [ref=e296]:
        - generic [ref=e297]:
          - paragraph [ref=e302]: Employees on Leave Today
          - generic [ref=e303] [cursor=pointer]: 
        - separator [ref=e304]
        - generic [ref=e305]:
          - generic [ref=e306]:
            - img "profile picture" [ref=e308]
            - generic [ref=e309]:
              - paragraph [ref=e310]: bala ravi
              - paragraph [ref=e311]: CAN - Personal
            - paragraph [ref=e312]: "0303"
          - generic [ref=e313]:
            - img "profile picture" [ref=e315]
            - generic [ref=e316]:
              - paragraph [ref=e317]: manda user
              - paragraph [ref=e318]: CAN - Bereavement (Half Day - Morning)
            - paragraph [ref=e319]: muser
      - generic [ref=e321]:
        - generic [ref=e323]:
          - generic [ref=e324]: 
          - paragraph [ref=e325]: Employee Distribution by Sub Unit
        - separator [ref=e326]
        - list [ref=e331]:
          - listitem [ref=e332] [cursor=pointer]:
            - generic "Engineering" [ref=e334]
          - listitem [ref=e335] [cursor=pointer]:
            - generic "Human Resources" [ref=e337]
          - listitem [ref=e338] [cursor=pointer]:
            - generic "Administration" [ref=e340]
          - listitem [ref=e341] [cursor=pointer]:
            - generic "Client Services" [ref=e343]
          - listitem [ref=e344] [cursor=pointer]:
            - generic "Unassigned" [ref=e346]
      - generic [ref=e348]:
        - generic [ref=e350]:
          - generic [ref=e351]: 
          - paragraph [ref=e352]: Employee Distribution by Location
        - separator [ref=e353]
        - list [ref=e358]:
          - listitem [ref=e359] [cursor=pointer]:
            - generic "Texas R&D" [ref=e361]
          - listitem [ref=e362] [cursor=pointer]:
            - generic "New York Sales Office" [ref=e364]
          - listitem [ref=e365] [cursor=pointer]:
            - generic "Unassigned" [ref=e367]
    - generic [ref=e368]:
      - paragraph [ref=e369]: OrangeHRM OS 5.8
      - paragraph [ref=e370]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e371] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
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
  39  |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
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
> 111 |     await page.waitForLoadState(WAIT_STATES.NETWORK_IDLE);
      |                ^ TimeoutError: page.waitForLoadState: Timeout 30000ms exceeded.
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