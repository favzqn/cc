# CLAUDE.md — AI-Assisted QA Framework Guide

This file configures [Claude Code](https://claude.ai/code) for this project and documents
how Claude AI is integrated into the test automation framework itself.

---

## Project Overview

OrangeHRM QA Automation Framework — a senior-grade Playwright + TypeScript test suite
with **AI-powered** capabilities via the Anthropic Claude API.

**Stack:** Playwright · TypeScript · Allure · K6 · GitHub Actions · Claude AI

---

## Custom Slash Commands (Skills)

These project-specific commands are available inside Claude Code:

| Command | Purpose |
|---------|---------|
| `/generate-test <description>` | Scaffold a full Page Object + test spec for any OrangeHRM module |
| `/analyze-failure <test-name>` | AI diagnosis of a failing test with screenshot + DOM analysis |
| `/heal-selectors [file]` | Find broken locators and suggest ARIA-first replacements |
| `/run-smoke [browser]` | Execute smoke suite and get an AI-interpreted pass/fail summary |
| `/flaky-check [test] [--runs N]` | Run a test N times and detect instability patterns with Claude |
| `/perf-report [login\|employee\|all]` | Run K6 tests and get an AI performance verdict |
| `/inspect-app <page>` | Live browser inspection via MCP — map DOM for POM generation |
| `/coverage-report` | Analyze which OrangeHRM modules have test coverage and what's missing |

All commands live in `.claude/commands/` as markdown files.

---

## MCP Servers

Configured in `.claude/settings.json`:

### Chrome DevTools MCP
Enables live browser inspection from within Claude Code.

```bash
# Auto-configured — no manual setup needed
# Used by: /inspect-app, /analyze-failure, /heal-selectors
```

Available tools when connected:
| MCP Tool | QA Use Case |
|----------|------------|
| `take_screenshot` | Capture page state on test failure |
| `take_snapshot` | Full DOM snapshot for selector analysis |
| `list_network_requests` | Inspect REST API calls during test execution |
| `list_console_messages` | Surface JavaScript errors affecting test stability |
| `evaluate_script` | Run JavaScript in browser context for debugging |
| `navigate_page` | Navigate to any OrangeHRM page for live inspection |
| `fill` / `click` | Interactive exploratory testing |
| `performance_start_trace` | Profile page load during performance investigation |

### Playwright MCP
Direct Playwright browser control from Claude — useful for generating tests interactively.

### Context7 MCP
Fetches live documentation for Playwright, K6, and Allure inline — no tab switching.

---

## Claude Code Commands

### Running Tests
```bash
# Run all tests
npm test

# Run by tag
npm run test:smoke        # Critical path only
npm run test:regression   # Full regression suite
npm run test:employee     # Employee lifecycle tests
npm run test:api          # API contract tests

# Run cross-browser in parallel (4 workers)
npm run test:parallel

# Run headed (with browser visible) for debugging
HEADED=true npm test
```

### Performance Tests
```bash
npm run perf:login        # Login API load test
npm run perf:employee     # Employee CRUD load test
npm run perf:all          # All performance scenarios
```

### Reports
```bash
npm run report:generate   # Generate Allure HTML report
npm run report:open       # Open report in browser
```

---

## AI Integration Architecture

This framework uses Claude AI in three ways:

### 1. Flaky Test Detection (`src/utils/ai-helper.ts`)
The `AITestHelper.detectFlakyTests()` method sends test run history to Claude,
which analyzes patterns (intermittent, timing-sensitive, data-dependent) and
returns prioritized mitigation strategies.

**Trigger:** Runs automatically in CI after each main branch merge (see `scripts/analyze-flaky.js`).

### 2. Failure Analysis
`AITestHelper.analyzeFailure()` sends error messages, stack traces, and last-known
page URL to Claude Sonnet, which returns a root cause + concrete fix recommendation.

**Trigger:** Call from a test's `afterEach` hook when a test fails.

### 3. Selector Healing
`AITestHelper.healSelector()` sends a broken CSS selector + surrounding HTML to
Claude Haiku (fast + cheap) and receives a more resilient ARIA/role-based alternative.

**When to use:** When selectors break after a UI change — ask Claude to suggest a fix.

### 4. AI Test Data Generation
`AITestHelper.generateTestData(scenario, schema)` generates scenario-appropriate,
realistic test data using Claude's contextual reasoning (not just random strings).

---

## Model Selection Strategy

| Task | Model | Rationale |
|------|-------|-----------|
| Flaky analysis | claude-opus-4-6 | Complex reasoning over test patterns |
| Failure analysis | claude-sonnet-4-6 | Balanced quality/speed for CI |
| Selector healing | claude-haiku-4-5-20251001 | Fastest, sufficient for simple lookup |
| Data generation | claude-haiku-4-5-20251001 | Fast, low cost for bulk generation |

---

## MCP Integration

This project supports the **Chrome DevTools MCP server** for enhanced test debugging.

When Claude Code has access to the Chrome DevTools MCP (`mcp__chrome-devtools__*` tools),
you can use Claude to:

- **Screenshot capture:** `mcp__chrome-devtools__take_screenshot` — capture current state
- **Live DOM inspection:** `mcp__chrome-devtools__evaluate_script` — run JS in browser context
- **Network monitoring:** `mcp__chrome-devtools__list_network_requests` — inspect API calls
- **Console errors:** `mcp__chrome-devtools__list_console_messages` — surface JS errors
- **Performance tracing:** `mcp__chrome-devtools__performance_start_trace` — profile page load

**Example:** When a Playwright test fails on a selector, use:
```
mcp__chrome-devtools__take_snapshot → analyze the DOM → suggest fix
```

---

## Framework Conventions

### Page Object Model
- All pages extend `BasePage` from `src/pages/base.page.ts`
- Locators are methods (not properties) to ensure fresh DOM queries
- Use ARIA roles/labels over CSS selectors: `getByRole('button', { name: 'Save' })`
- Smart waiting via `waitForPageReady()` handles OrangeHRM's SPA spinners

### Test Fixtures
All Page Objects, API clients, and AI helpers are injected via Playwright fixtures
(`src/fixtures/base.fixture.ts`). Never instantiate them directly in tests.

### Test Tagging Strategy
| Tag | Purpose | When to run |
|-----|---------|-------------|
| `@smoke` | Critical path, ≤5 min | Every PR |
| `@regression` | Full suite | Nightly + pre-release |
| `@employee` | Employee domain tests | Employee feature changes |
| `@api` | API contract tests | API changes |
| `@rbac` | Security/access tests | Auth changes |
| `@security` | Security-specific | Security audits |

### Retry Strategy
```
UI tests:  retries: 2 (CI), 1 (local)  — handles transient network/animation issues
API tests: retries: 1                   — API should be deterministic
```

### Environment Configuration
- Config loaded from `.env.{TEST_ENV}` then falls back to `.env`
- Set `TEST_ENV=staging` to target staging environment
- Never hardcode credentials — always use `config.adminUser` from `env.config.ts`

---

## Flaky Test Mitigation Strategy

### Detection
1. **CI history analysis:** Every main branch run's results are archived as Allure artifacts.
2. **AI analysis job:** The `flaky-analysis` CI job calls `scripts/analyze-flaky.js` to
   identify tests with mixed pass/fail patterns across runs.
3. **Threshold:** Tests with <90% pass rate over 10+ runs are flagged as flaky.

### Mitigation Patterns Applied in This Framework
| Pattern | Implementation |
|---------|---------------|
| Smart waits | `waitForPageReady()` waits for both `networkidle` + spinner disappear |
| Retry-aware clicks | `safeClick()` waits for `toBeVisible` before every click |
| Input verification | `smartFill()` verifies the value was applied after fill |
| Isolated test data | `TestDataFactory` generates unique names with worker-index prefix |
| Auth reuse | Global setup saves storage state — no login flakiness per test |
| Parallel isolation | Each worker gets unique employee IDs (`W{worker}{timestamp}`) |
| Automatic cleanup | `empCleanup` fixture deletes all created data via API after test |

---

## Adding New Tests

1. Create the page object in `src/pages/`
2. Add fixture binding in `src/fixtures/base.fixture.ts`
3. Write the spec in `tests/e2e/{domain}/`
4. Tag with appropriate `@` tags
5. Update `src/data/test-employees.json` if new test data scenarios are needed

Claude Code can generate test files from a description:
> "Generate a Playwright spec for testing the Leave Management module following
>  the existing patterns in tests/e2e/employee/"
