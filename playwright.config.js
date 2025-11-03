import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const API_PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;
const UI_PORT  = process.env.UI_PORT  ? Number(process.env.UI_PORT)  : 5173;

// absolute paths avoid Windows path/regex quirks
const API_DIR = path.resolve('tests/api');
const UI_DIR  = path.resolve('tests/ui');

export default defineConfig({
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [['list'], ['junit', { outputFile: 'reports/junit.xml' }], ['html']],

  webServer: [
    { command: `node mock-server/server.js`,              port: API_PORT, reuseExistingServer: !process.env.CI },
    { command: `npx http-server ./app -p ${UI_PORT} -c-1`, port: UI_PORT,  reuseExistingServer: !process.env.CI }
  ],

  projects: [
    {
      name: 'API Tests',
      testDir: API_DIR,
      testMatch: ['**/*.spec.js'],
      use: {
        baseURL: `http://localhost:${API_PORT}`,
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
      }
    },
    {
      name: 'UI - Chromium',
      testDir: UI_DIR,
      testMatch: ['**/*.spec.js'],
      use: {
        baseURL: `http://localhost:${UI_PORT}`,
        ...devices['Desktop Chrome'],
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
      }
    },
    {
      name: 'UI - Firefox',
      testDir: UI_DIR,
      testMatch: ['**/*.spec.js'],
      use: {
        baseURL: `http://localhost:${UI_PORT}`,
        ...devices['Desktop Firefox'],
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
      }
    }
  ]
});
