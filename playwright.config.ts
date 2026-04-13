import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/env.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : 2,
  timeout: 60_000,
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.02 },
  },

  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      environmentInfo: {
        os: process.platform,
        node: process.version,
        base_url: config.baseUrl,
        environment: config.environment,
      },
    }],
    ['json', { outputFile: 'reports/results.json' }],
    process.env.CI ? ['github'] : ['list'],
  ],

  use: {
    baseURL: config.baseUrl,
    headless: process.env.HEADED !== 'true',
    viewport: { width: 1440, height: 900 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    extraHTTPHeaders: { 'Accept-Language': 'en-US' },
  },

  projects: [
    // ── Auth setup (runs once, saves storage state) ─────────────────────────
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // ── Smoke: fast feedback, tight timeouts ────────────────────────────────
    {
      name: 'smoke',
      grep: /@smoke/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'src/.auth/admin.json',
        video: 'off',
      },
      dependencies: ['setup'],
      retries: 1,
      timeout: 60_000,
    },

    // ── Cross-browser full regression ───────────────────────────────────────
    {
      name: 'chromium',
      testIgnore: /.*\.visual\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'src/.auth/admin.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      testIgnore: /.*\.visual\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'src/.auth/admin.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      testIgnore: /.*\.visual\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        storageState: 'src/.auth/admin.json',
      },
      dependencies: ['setup'],
    },

    // ── API tests (no browser rendering) ────────────────────────────────────
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'src/.auth/admin.json',
      },
      dependencies: ['setup'],
    },

    // ── Visual regression ────────────────────────────────────────────────────
    {
      name: 'visual',
      testMatch: /.*\.visual\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'src/.auth/admin.json',
      },
      dependencies: ['setup'],
    },
  ],

  outputDir: 'reports/artifacts',
  // Note: no globalSetup/globalTeardown — auth is handled by the 'setup' project above
});
