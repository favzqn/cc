/**
 * K6 Performance Test — Employee CRUD API
 *
 * Tests employee creation/retrieval/deletion via REST API under load.
 * Auth: session cookie obtained via CSRF-protected form login.
 *
 * Run: k6 run tests/performance/employee.k6.js
 */

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// ─── Custom Metrics ──────────────────────────────────────────────────────────
const createSuccessRate = new Rate('employee_create_success_rate');
const createDuration = new Trend('employee_create_duration', true);
const getSuccessRate = new Rate('employee_get_success_rate');
const getDuration = new Trend('employee_get_duration', true);
const deleteSuccessRate = new Rate('employee_delete_success_rate');
const apiErrors = new Counter('api_errors');

// ─── Test Configuration ───────────────────────────────────────────────────────
export const options = {
  scenarios: {
    employee_crud: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '30s', target: 0 },
      ],
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<5000'],
    employee_create_success_rate: ['rate>0.90'],
    employee_get_success_rate: ['rate>0.95'],
    employee_delete_success_rate: ['rate>0.90'],
    http_req_failed: ['rate<0.10'],
    employee_create_duration: ['p(95)<5000'],
    employee_get_duration: ['p(95)<2000'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://opensource-demo.orangehrmlive.com';
const API_URL = `${BASE_URL}/web/index.php/api/v2`;

function extractCsrfToken(html) {
  // OrangeHRM renders the token as a Vue prop: :token="&quot;TOKEN&quot;"
  const match = html.match(/:token="&quot;([^&]+)&quot;"/);
  return match ? match[1] : null;
}

/**
 * Get session cookies via browser-style form login.
 * Returns a cookie jar ready for use with API calls.
 */
function getSessionCookieJar() {
  const jar = http.cookieJar();

  // 1. GET login page → CSRF token
  const loginPage = http.get(`${BASE_URL}/web/index.php/auth/login`, { jar });
  const csrfToken = extractCsrfToken(loginPage.body);
  if (!csrfToken) throw new Error('Could not extract CSRF token from login page');

  // 2. POST credentials → session cookie
  http.post(
    `${BASE_URL}/web/index.php/auth/validate`,
    { username: 'Admin', password: 'admin123', _token: csrfToken },
    { jar, redirects: 5 }
  );

  return jar;
}

function randomName() {
  const names = ['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry'];
  const surnames = ['Smith', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Taylor'];
  const ts = Date.now();
  return {
    firstName: `${names[Math.floor(Math.random() * names.length)]}Perf`,
    lastName: `${surnames[Math.floor(Math.random() * surnames.length)]}${ts}`,
  };
}

// ─── Test Execution ───────────────────────────────────────────────────────────
export function setup() {
  // Verify auth works before running load
  const jar = getSessionCookieJar();
  const verify = http.get(`${API_URL}/pim/employees?limit=1`, { jar });
  if (verify.status !== 200) {
    throw new Error(`Auth verification failed: ${verify.status}`);
  }
  console.log('Setup: auth verified successfully');
}

export default function () {
  let jar;
  try {
    jar = getSessionCookieJar();
  } catch (e) {
    apiErrors.add(1);
    sleep(2);
    return;
  }

  const apiHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  let empNumber;

  group('Create Employee', () => {
    const { firstName, lastName } = randomName();
    const start = Date.now();

    const response = http.post(
      `${API_URL}/pim/employees`,
      JSON.stringify({ firstName, middleName: '', lastName }),
      { jar, headers: apiHeaders }
    );

    createDuration.add(Date.now() - start);

    const success = check(response, {
      'create status 200': (r) => r.status === 200,
      'create returns empNumber': (r) => {
        try {
          const body = JSON.parse(r.body);
          empNumber = body.data?.empNumber;
          return typeof empNumber === 'number';
        } catch { return false; }
      },
      'create time < 5s': (r) => r.timings.duration < 5000,
    });

    createSuccessRate.add(success);
    if (!success) apiErrors.add(1);
  });

  if (!empNumber) { sleep(2); return; }

  group('Get Employee', () => {
    const start = Date.now();
    const response = http.get(`${API_URL}/pim/employees/${empNumber}`, { jar, headers: apiHeaders });
    getDuration.add(Date.now() - start);

    const success = check(response, {
      'get status 200': (r) => r.status === 200,
      'get returns correct employee': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.data?.empNumber === empNumber;
        } catch { return false; }
      },
    });
    getSuccessRate.add(success);
  });

  group('Delete Employee', () => {
    const response = http.del(
      `${API_URL}/pim/employees`,
      JSON.stringify({ ids: [empNumber] }),
      { jar, headers: apiHeaders }
    );

    const success = check(response, {
      'delete status 200': (r) => r.status === 200,
    });
    deleteSuccessRate.add(success);
  });

  sleep(2);
}

// ─── Reporting ────────────────────────────────────────────────────────────────
export function handleSummary(data) {
  return {
    'reports/performance/employee-report.html': htmlReport(data, {
      title: 'Employee API Performance Report',
    }),
    'reports/performance/employee-summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
