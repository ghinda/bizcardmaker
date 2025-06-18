import {test as base, chromium} from '@playwright/test'

export const test = base.extend({
  context: async ({}, use) => {
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        '--start-maximized',
      ],
    })

    await use(context)
    await context.close()
  },
})

export const expect = test.expect
