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
              - paragraph [ref=e127]: Nguyễn Đức
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
              - paragraph [ref=e152]: "Punched Out: Aug 19th at 08:23 AM (GMT 5.5)"
          - generic [ref=e153]:
            - generic [ref=e154]: 0h 0m Today
            - button "" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: 
          - separator [ref=e157]
          - generic [ref=e158]:
            - generic [ref=e159]:
              - paragraph [ref=e160]: This Week
              - paragraph [ref=e161]: Aug 17 - Aug 23
            - generic [ref=e162]:
              - generic [ref=e163]: 
              - paragraph [ref=e164]: 0h 2m
      - generic [ref=e168]:
        - generic [ref=e170]:
          - generic [ref=e171]: 
          - paragraph [ref=e172]: My Actions
        - separator [ref=e173]
        - generic [ref=e175]:
          - generic [ref=e176]:
            - button [ref=e177] [cursor=pointer]
            - paragraph [ref=e183] [cursor=pointer]: (1) Pending Self Review
          - generic [ref=e184]:
            - button [ref=e185] [cursor=pointer]
            - paragraph [ref=e194] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=e196]:
        - generic [ref=e198]:
          - generic [ref=e199]: 
          - paragraph [ref=e200]: Quick Launch
        - separator [ref=e201]
        - generic [ref=e203]:
          - generic [ref=e204]:
            - button "Assign Leave" [ref=e205] [cursor=pointer]
            - generic "Assign Leave" [ref=e208]:
              - paragraph [ref=e209]: Assign Leave
          - generic [ref=e210]:
            - button "Leave List" [ref=e211] [cursor=pointer]
            - generic "Leave List" [ref=e218]:
              - paragraph [ref=e219]: Leave List
          - generic [ref=e220]:
            - button "Timesheets" [ref=e221] [cursor=pointer]
            - generic "Timesheets" [ref=e227]:
              - paragraph [ref=e228]: Timesheets
          - generic [ref=e229]:
            - button "Apply Leave" [ref=e230] [cursor=pointer]
            - generic "Apply Leave" [ref=e233]:
              - paragraph [ref=e234]: Apply Leave
          - generic [ref=e235]:
            - button "My Leave" [ref=e236] [cursor=pointer]
            - generic "My Leave" [ref=e241]:
              - paragraph [ref=e242]: My Leave
          - generic [ref=e243]:
            - button "My Timesheet" [ref=e244] [cursor=pointer]
            - generic "My Timesheet" [ref=e247]:
              - paragraph [ref=e248]: My Timesheet
      - generic [ref=e250]:
        - generic [ref=e252]:
          - generic [ref=e253]: 
          - paragraph [ref=e254]: Buzz Latest Posts
        - separator [ref=e255]
        - generic [ref=e257]:
          - generic [ref=e258]:
            - generic [ref=e259] [cursor=pointer]:
              - img "profile picture" [ref=e261]
              - generic [ref=e262]:
                - paragraph [ref=e263]: Nguyễn Đức
                - paragraph [ref=e264]: 2020-08-10 03:38 AM
            - separator [ref=e265]
            - paragraph [ref=e266]: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
          - generic [ref=e267]:
            - generic [ref=e268] [cursor=pointer]:
              - img "profile picture" [ref=e270]
              - generic [ref=e271]:
                - paragraph [ref=e272]: Sania Shaheen
                - paragraph [ref=e273]: 2020-08-10 03:38 AM
            - separator [ref=e274]
            - paragraph [ref=e275]: "World Championship: What makes the perfect snooker player? Mark Selby: Robertson has one of the best techniques in the game. It is very, very straight and he fully commits to every single shot he plays. John Higgins: Every shot is repetitive. He always keeps the same technique and cues through the ball bang straight. Barry Hawkins: Robertson is textbook with his grip and has a ramrod solid cue action, delivering it in a straight line. Honourable mentions: Shaun Murphy, Ding Junhui, Jack Lisowski."
          - generic [ref=e276]:
            - generic [ref=e277] [cursor=pointer]:
              - img "profile picture" [ref=e279]
              - generic [ref=e280]:
                - paragraph [ref=e281]: Rebecca Harmony
                - paragraph [ref=e282]: 2020-08-10 03:34 AM
            - separator [ref=e283]
            - paragraph [ref=e284]: Throwback Thursdays!!
            - img [ref=e285]
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
              - paragraph [ref=e310]: Joana Marie Guibao
              - paragraph [ref=e311]: CAN - Personal (Half Day - Morning)
            - paragraph [ref=e312]: "1129"
          - generic [ref=e313]:
            - img "profile picture" [ref=e315]
            - generic [ref=e316]:
              - paragraph [ref=e317]: Qa15vzte Leave
              - paragraph [ref=e318]: CAN - Vacation
            - paragraph
          - generic [ref=e319]:
            - img "profile picture" [ref=e321]
            - generic [ref=e322]:
              - paragraph [ref=e323]: Qa1hsc2w Leave
              - paragraph [ref=e324]: CAN - Vacation (Half Day - Morning)
            - paragraph
          - generic [ref=e325]:
            - img "profile picture" [ref=e327]
            - generic [ref=e328]:
              - paragraph [ref=e329]: Qa1xwlwy Leave
              - paragraph [ref=e330]: CAN - Vacation
            - paragraph
          - generic [ref=e331]:
            - img "profile picture" [ref=e333]
            - generic [ref=e334]:
              - paragraph [ref=e335]: Qa60q5ji Leave
              - paragraph [ref=e336]: CAN - Vacation
            - paragraph
          - generic [ref=e337]:
            - img "profile picture" [ref=e339]
            - generic [ref=e340]:
              - paragraph [ref=e341]: Qa82c4uw Leave
              - paragraph [ref=e342]: CAN - Vacation (Half Day - Morning)
            - paragraph
          - generic [ref=e343]:
            - img "profile picture" [ref=e345]
            - generic [ref=e346]:
              - paragraph [ref=e347]: Qa8nwi9z Leave
              - paragraph [ref=e348]: CAN - Vacation
            - paragraph
          - generic [ref=e349]:
            - img "profile picture" [ref=e351]
            - generic [ref=e352]:
              - paragraph [ref=e353]: Qa9zpyhk Leave
              - paragraph [ref=e354]: CAN - Vacation (Half Day - Morning)
            - paragraph
          - generic [ref=e355]:
            - img "profile picture" [ref=e357]
            - generic [ref=e358]:
              - paragraph [ref=e359]: Qabxsdv4 Leave
              - paragraph [ref=e360]: CAN - Vacation (Half Day - Morning)
            - paragraph
          - generic [ref=e361]:
            - img "profile picture" [ref=e363]
            - generic [ref=e364]:
              - paragraph [ref=e365]: Qacrnwz9 Leave
              - paragraph [ref=e366]: CAN - Vacation
            - paragraph
          - generic [ref=e367]:
            - img "profile picture" [ref=e369]
            - generic [ref=e370]:
              - paragraph [ref=e371]: Qacw9hby Leave
              - paragraph [ref=e372]: CAN - Vacation (Half Day - Morning)
            - paragraph
          - generic [ref=e373]:
            - img "profile picture" [ref=e375]
            - generic [ref=e376]:
              - paragraph [ref=e377]: Qad2wxgy Leave
              - paragraph [ref=e378]: CAN - Vacation
            - paragraph
          - generic [ref=e379]:
            - img "profile picture" [ref=e381]
            - generic [ref=e382]:
              - paragraph [ref=e383]: Qafvp38a Leave
              - paragraph [ref=e384]: CAN - Vacation
            - paragraph
          - generic [ref=e385]:
            - img "profile picture" [ref=e387]
            - generic [ref=e388]:
              - paragraph [ref=e389]: Qalwfsnc Leave
              - paragraph [ref=e390]: CAN - Vacation
            - paragraph
          - generic [ref=e391]:
            - img "profile picture" [ref=e393]
            - generic [ref=e394]:
              - paragraph [ref=e395]: Qamk59qd Leave
              - paragraph [ref=e396]: CAN - Vacation
            - paragraph
          - generic [ref=e397]:
            - img "profile picture" [ref=e399]
            - generic [ref=e400]:
              - paragraph [ref=e401]: Qaoh5gi9 Leave
              - paragraph [ref=e402]: CAN - Vacation
            - paragraph
          - generic [ref=e403]:
            - img "profile picture" [ref=e405]
            - generic [ref=e406]:
              - paragraph [ref=e407]: Qareityf Leave
              - paragraph [ref=e408]: CAN - Vacation (Half Day - Morning)
            - paragraph
          - generic [ref=e409]:
            - img "profile picture" [ref=e411]
            - generic [ref=e412]:
              - paragraph [ref=e413]: Qat0kibz Leave
              - paragraph [ref=e414]: CAN - Vacation
            - paragraph
          - generic [ref=e415]:
            - img "profile picture" [ref=e417]
            - generic [ref=e418]:
              - paragraph [ref=e419]: Qauniffr Leave
              - paragraph [ref=e420]: CAN - Vacation
            - paragraph
          - generic [ref=e421]:
            - img "profile picture" [ref=e423]
            - generic [ref=e424]:
              - paragraph [ref=e425]: Qavducmx Leave
              - paragraph [ref=e426]: CAN - Vacation
            - paragraph
          - generic [ref=e427]:
            - img "profile picture" [ref=e429]
            - generic [ref=e430]:
              - paragraph [ref=e431]: Qavia7zh Leave
              - paragraph [ref=e432]: CAN - Vacation (Half Day - Morning)
            - paragraph
          - generic [ref=e433]:
            - img "profile picture" [ref=e435]
            - generic [ref=e436]:
              - paragraph [ref=e437]: Qavjouds Leave
              - paragraph [ref=e438]: CAN - Vacation
            - paragraph
          - generic [ref=e439]:
            - img "profile picture" [ref=e441]
            - generic [ref=e442]:
              - paragraph [ref=e443]: Qaxstfv5 Leave
              - paragraph [ref=e444]: CAN - Vacation
            - paragraph
          - generic [ref=e445]:
            - img "profile picture" [ref=e447]
            - generic [ref=e448]:
              - paragraph [ref=e449]: Qazdg8ar Leave
              - paragraph [ref=e450]: CAN - Vacation
            - paragraph
          - generic [ref=e451]:
            - img "profile picture" [ref=e453]
            - generic [ref=e454]:
              - paragraph [ref=e455]: Qazldiwj Leave
              - paragraph [ref=e456]: CAN - Vacation (Half Day - Morning)
            - paragraph
      - generic [ref=e458]:
        - generic [ref=e460]:
          - generic [ref=e461]: 
          - paragraph [ref=e462]: Employee Distribution by Sub Unit
        - separator [ref=e463]
        - list [ref=e468]:
          - listitem [ref=e469] [cursor=pointer]:
            - generic "Engineering" [ref=e471]
          - listitem [ref=e472] [cursor=pointer]:
            - generic "Human Resources" [ref=e474]
          - listitem [ref=e475] [cursor=pointer]:
            - generic "Administration" [ref=e477]
          - listitem [ref=e478] [cursor=pointer]:
            - generic "Client Services" [ref=e480]
          - listitem [ref=e481] [cursor=pointer]:
            - generic "Unassigned" [ref=e483]
      - generic [ref=e485]:
        - generic [ref=e487]:
          - generic [ref=e488]: 
          - paragraph [ref=e489]: Employee Distribution by Location
        - separator [ref=e490]
        - list [ref=e495]:
          - listitem [ref=e496] [cursor=pointer]:
            - generic "Texas R&D" [ref=e498]
          - listitem [ref=e499] [cursor=pointer]:
            - generic "New York Sales Office" [ref=e501]
          - listitem [ref=e502] [cursor=pointer]:
            - generic "Unassigned" [ref=e504]
    - generic [ref=e505]:
      - paragraph [ref=e506]: OrangeHRM OS 5.9
      - paragraph [ref=e507]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e508] [cursor=pointer]:
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