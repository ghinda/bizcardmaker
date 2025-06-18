import { defineConfig } from '@playwright/test'

const baseURL = 'http://127.0.0.1:9000'
export default defineConfig({
  testDir: './tests/playwright',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  maxFailures: 1,
  workers: 1,
  reporter: 'line',
  timeout: 10 * 60 * 1000,
  use: {
    baseURL: baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  webServer: {
    command: 'npm run server:dist',
    url: baseURL,
    reuseExistingServer: true,
  },
})
