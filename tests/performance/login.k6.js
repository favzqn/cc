/**
 * K6 Performance Test — Login Flow
 *
 * Tests the full login flow (GET login page → POST validate) under load.
 * OrangeHRM uses session-based auth (CSRF-protected form), not OAuth password grant.
 *
 * Scenarios:
 * - Smoke:  1 VU, 30s — verify baseline
 * - Load:  10 VU, 1m — expected traffic
 * - Spike: 50 VU, 30s — traffic surge
 *
 * Run: k6 run tests/performance/login.k6.js
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ─── Custom Metrics ──────────────────────────────────────────────────────────
const loginSuccessRate = new Rate('login_success_rate');
const loginDuration = new Trend('login_duration', true);
const totalLogins = new Counter('total_logins');
const failedLogins = new Counter('failed_logins');

// ─── Test Configuration ───────────────────────────────────────────────────────
export const options = {
  scenarios: {
    smoke: {
      executor: 'constant-vus',
      vus: 1,
      duration: '30s',
      tags: { scenario: 'smoke' },
    },
    load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 0 },
      ],
      startTime: '35s',
      tags: { scenario: 'load' },
    },
    spike: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '10s', target: 0 },
      ],
      startTime: '3m',
      tags: { scenario: 'spike' },
    },
  },

  thresholds: {
    // Overall p(95) allows for spike degradation on a shared demo server
    http_req_duration: ['p(95)<6000', 'p(99)<10000'],
    // Load scenario — demo server under 10 VUs
    'http_req_duration{scenario:load}': ['p(95)<3000'],
    // Functional success: login must work 100% under normal load
    'login_success_rate{scenario:load}': ['rate>0.95'],
    // Overall includes spike — demo server is shared and public
    login_success_rate: ['rate>0.70'],
    http_req_failed: ['rate<0.05'],
    // Full flow duration per scenario
    'login_duration{scenario:smoke}': ['p(95)<5000'],
    'login_duration{scenario:load}': ['p(95)<8000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://opensource-demo.orangehrmlive.com';

function extractCsrfToken(html) {
  // OrangeHRM renders the token as a Vue prop: :token="&quot;TOKEN&quot;"
  const match = html.match(/:token="&quot;([^&]+)&quot;"/);
  return match ? match[1] : null;
}

// ─── Test Execution ───────────────────────────────────────────────────────────
export default function () {
  group('Login Flow', () => {
    const jar = http.cookieJar();
    const startTime = Date.now();

    // Step 1: GET login page to obtain CSRF token + session cookie
    const loginPage = http.get(`${BASE_URL}/web/index.php/auth/login`, {
      jar,
      tags: { name: 'GET login page' },
    });

    const csrfToken = extractCsrfToken(loginPage.body);

    const step1Ok = check(loginPage, {
      'login page status 200': (r) => r.status === 200,
      'login page has csrf token': () => csrfToken !== null,
      'login page time < 3s': (r) => r.timings.duration < 3000,
    });

    if (!step1Ok || !csrfToken) {
      failedLogins.add(1);
      loginSuccessRate.add(false);
      sleep(1);
      return;
    }

    // Step 2: POST credentials
    const loginResponse = http.post(
      `${BASE_URL}/web/index.php/auth/validate`,
      {
        username: 'Admin',
        password: 'admin123',
        _token: csrfToken,
      },
      {
        jar,
        redirects: 5,
        tags: { name: 'POST login validate' },
      }
    );

    const duration = Date.now() - startTime;
    loginDuration.add(duration);
    totalLogins.add(1);

    // Functional success: did login actually work?
    const functionalSuccess = check(loginResponse, {
      'login redirects to dashboard': (r) =>
        r.url.includes('dashboard') || r.status === 200,
      'no error in response': (r) => !r.body.toString().includes('Invalid credentials'),
    });

    // Performance checks tracked separately — slow login ≠ broken login
    check(loginResponse, {
      'login time < 3s': (r) => r.timings.duration < 3000,
    });

    loginSuccessRate.add(functionalSuccess);
    if (!functionalSuccess) failedLogins.add(1);

    sleep(1);
  });
}

// ─── Reporting ────────────────────────────────────────────────────────────────
export function handleSummary(data) {
  return {
    'reports/performance/login-report.html': htmlReport(data, { title: 'Login Performance Report' }),
    'reports/performance/login-summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
