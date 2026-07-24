# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/accessibility/a11y.spec.ts >> Accessibility Audits >> dashboard has no critical a11y violations @a11y
- Location: tests/e2e/accessibility/a11y.spec.ts:106:7

# Error details

```
Error: 
Critical a11y violations:
  [serious] aria-prohibited-attr: Ensure ARIA attributes are not prohibited for an element's role

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"description": "Ensure ARIA attributes are not prohibited for an element's role", "help": "Elements must only use permitted ARIA attributes", "helpUrl": "https://dequeuniversity.com/rules/axe/4.11/aria-prohibited-attr?application=playwright", "id": "aria-prohibited-attr", "impact": "serious", "nodes": [{"all": [], "any": [], "failureSummary": "Fix all of the following:
  aria-label attribute cannot be used on a div with no valid role attribute.", "html": "<div class=\"html5-video-player ytp-hide-controls ytp-exp-bottom-control-flexbox ytp-modern-caption ytp-livebadge-color unstarted-mode ytp-small-mode\" tabindex=\"\" id=\"movie_player\" data-version=\"/s/player/7a7969c2/player_embed_es6.vflset/en_US/base.js\" aria-label=\"YouTube Video Player\">", "impact": "serious", "none": [{"data": {"messageKey": "noRoleSingular", "nodeName": "div", "prohibited": ["aria-label"], "role": null}, "id": "aria-prohibited-attr", "impact": "serious", "message": "aria-label attribute cannot be used on a div with no valid role attribute.", "relatedNodes": []}], "target": ["iframe", "#movie_player"]}], "tags": ["cat.aria", "wcag2a", "wcag412", "EN-301-549", "EN-9.4.1.2", "RGAAv4", "RGAA-7.1.1"]}]
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
              - paragraph [ref=e127]: taaJRQeYUW user
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
              - paragraph [ref=e152]: "Punched Out: Today at 10:43 PM (GMT 5.5)"
          - generic [ref=e153]:
            - generic [ref=e154]: 12h 4m Today
            - button "" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: 
          - separator [ref=e157]
          - generic [ref=e158]:
            - generic [ref=e159]:
              - paragraph [ref=e160]: This Week
              - paragraph [ref=e161]: Jul 20 - Jul 26
            - generic [ref=e162]:
              - generic [ref=e163]: 
              - paragraph [ref=e164]: 12h 4m
      - generic [ref=e168]:
        - generic [ref=e170]:
          - generic [ref=e171]: 
          - paragraph [ref=e172]: My Actions
        - separator [ref=e173]
        - generic [ref=e175]:
          - generic [ref=e176]:
            - button [ref=e177] [cursor=pointer]
            - paragraph [ref=e193] [cursor=pointer]: (1) Timesheet to Approve
          - generic [ref=e194]:
            - button [ref=e195] [cursor=pointer]
            - paragraph [ref=e201] [cursor=pointer]: (1) Pending Self Review
          - generic [ref=e202]:
            - button [ref=e203] [cursor=pointer]
            - paragraph [ref=e212] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=e214]:
        - generic [ref=e216]:
          - generic [ref=e217]: 
          - paragraph [ref=e218]: Quick Launch
        - separator [ref=e219]
        - generic [ref=e221]:
          - generic [ref=e222]:
            - button "Assign Leave" [ref=e223] [cursor=pointer]
            - generic "Assign Leave" [ref=e226]:
              - paragraph [ref=e227]: Assign Leave
          - generic [ref=e228]:
            - button "Leave List" [ref=e229] [cursor=pointer]
            - generic "Leave List" [ref=e236]:
              - paragraph [ref=e237]: Leave List
          - generic [ref=e238]:
            - button "Timesheets" [ref=e239] [cursor=pointer]
            - generic "Timesheets" [ref=e245]:
              - paragraph [ref=e246]: Timesheets
          - generic [ref=e247]:
            - button "Apply Leave" [ref=e248] [cursor=pointer]
            - generic "Apply Leave" [ref=e251]:
              - paragraph [ref=e252]: Apply Leave
          - generic [ref=e253]:
            - button "My Leave" [ref=e254] [cursor=pointer]
            - generic "My Leave" [ref=e259]:
              - paragraph [ref=e260]: My Leave
          - generic [ref=e261]:
            - button "My Timesheet" [ref=e262] [cursor=pointer]
            - generic "My Timesheet" [ref=e265]:
              - paragraph [ref=e266]: My Timesheet
      - generic [ref=e268]:
        - generic [ref=e270]:
          - generic [ref=e271]: 
          - paragraph [ref=e272]: Buzz Latest Posts
        - separator [ref=e273]
        - generic [ref=e275]:
          - generic [ref=e276]:
            - generic [ref=e277] [cursor=pointer]:
              - img "profile picture" [ref=e279]
              - generic [ref=e280]:
                - paragraph [ref=e281]: taaJRQeYUW akhil user
                - paragraph [ref=e282]: 2026-24-07 05:23 AM
            - separator [ref=e283]
            - iframe [ref=e285]:
              - generic [active] [ref=f1e1]:
                - generic "YouTube Video Player" [ref=f1e3]
                - generic [ref=f1e5]:
                  - generic:
                    - generic:
                      - button "Play video" [ref=f1e10] [cursor=pointer]:
                        - generic [ref=f1e13]:
                          - img
                      - button "Hide player controls" [ref=f1e14] [cursor=pointer]
                      - generic [ref=f1e21]:
                        - generic [ref=f1e22]:
                          - link "Home Tour-\"'ರಿಯಲ್ ಸಿಂಗಂ'-12 ಸರ್ಕಾರಿ ನೌಕರಿ ಪಡೆದ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಮನೆ-ಮಡದಿ ಲೈಫ್!\"-E01-PSI Zurilal Naik" [ref=f1e23] [cursor=pointer]:
                            - /url: https://www.youtube.com/watch?v=mG1_bXsbveM
                          - link "Kalamadhyama ಕಲಾಮಾಧ್ಯಮ" [ref=f1e24] [cursor=pointer]:
                            - /url: /channel/UCAhFKhVA7L_ZLAKw02xCHqA
                            - generic [ref=f1e25]: Kalamadhyama ಕಲಾಮಾಧ್ಯಮ
                        - generic [ref=f1e26]:
                          - button "thumbnail-image" [ref=f1e27] [cursor=pointer]:
                            - img "thumbnail-image" [ref=f1e28]
                          - generic [ref=f1e30]:
                            - generic: Kalamadhyama ಕಲಾಮಾಧ್ಯಮ
                            - generic: 2.42M subscribers
          - generic [ref=e286]:
            - generic [ref=e287] [cursor=pointer]:
              - img "profile picture" [ref=e289]
              - generic [ref=e290]:
                - paragraph [ref=e291]: taaJRQeYUW akhil user
                - paragraph [ref=e292]: 2026-24-07 05:11 AM
            - separator [ref=e293]
            - paragraph [ref=e294]: Automation Test Buzz Post
          - generic [ref=e295]:
            - generic [ref=e296] [cursor=pointer]:
              - img "profile picture" [ref=e298]
              - generic [ref=e299]:
                - paragraph [ref=e300]: taaJRQeYUW akhil user
                - paragraph [ref=e301]: 2026-24-07 05:10 AM
            - separator [ref=e302]
            - img [ref=e303]
          - generic [ref=e304]:
            - generic [ref=e305] [cursor=pointer]:
              - img "profile picture" [ref=e307]
              - generic [ref=e308]:
                - paragraph [ref=e309]: taaJRQeYUW akhil user
                - paragraph [ref=e310]: 2026-24-07 05:05 AM
            - separator [ref=e311]
            - img [ref=e312]
          - generic [ref=e313]:
            - generic [ref=e314] [cursor=pointer]:
              - img "profile picture" [ref=e316]
              - generic [ref=e317]:
                - paragraph [ref=e318]: taaJRQeYUW akhil user
                - paragraph [ref=e319]: 2026-24-07 04:44 AM
            - separator [ref=e320]
            - paragraph [ref=e321]: Buzz automation post validation 1784868243747
      - generic [ref=e323]:
        - generic [ref=e324]:
          - paragraph [ref=e329]: Employees on Leave Today
          - generic [ref=e330] [cursor=pointer]: 
        - separator [ref=e331]
        - generic [ref=e333]:
          - img "No Content" [ref=e334]
          - paragraph [ref=e335]: No Employees are on Leave Today
      - generic [ref=e337]:
        - generic [ref=e339]:
          - generic [ref=e340]: 
          - paragraph [ref=e341]: Employee Distribution by Sub Unit
        - separator [ref=e342]
        - list [ref=e347]:
          - listitem [ref=e348] [cursor=pointer]:
            - generic "Engineering" [ref=e350]
          - listitem [ref=e351] [cursor=pointer]:
            - generic "Human Resources" [ref=e353]
          - listitem [ref=e354] [cursor=pointer]:
            - generic "Administration" [ref=e356]
          - listitem [ref=e357] [cursor=pointer]:
            - generic "Client Services" [ref=e359]
          - listitem [ref=e360] [cursor=pointer]:
            - generic "Unassigned" [ref=e362]
      - generic [ref=e364]:
        - generic [ref=e366]:
          - generic [ref=e367]: 
          - paragraph [ref=e368]: Employee Distribution by Location
        - separator [ref=e369]
        - list [ref=e374]:
          - listitem [ref=e375] [cursor=pointer]:
            - generic "Texas R&D" [ref=e377]
          - listitem [ref=e378] [cursor=pointer]:
            - generic "New York Sales Office" [ref=e380]
          - listitem [ref=e381] [cursor=pointer]:
            - generic "Unassigned" [ref=e383]
    - generic [ref=e384]:
      - paragraph [ref=e385]: OrangeHRM OS 5.9
      - paragraph [ref=e386]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e387] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
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
> 127 |     expect(actionable, formatViolations(actionable)).toHaveLength(0);
      |                                                      ^ Error: 
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