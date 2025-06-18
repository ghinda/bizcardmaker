import GM from 'gm'
const gm = GM.subClass({ imageMagick: true })
import fs from 'fs'

import {test, expect} from './fixtures.mjs'

const downloadDir = 'tests/media/themes/'

const mediaDir = 'tests/media'
const themesDir = mediaDir + '/themes'
const themesOrigDir = mediaDir + '/themes-orig'
const themesDiffDir = mediaDir + '/themes-diff'

// make sure we at least have an empty themes-diff folder
// or imageMagick will break
if(!fs.existsSync(themesDiffDir)){
  fs.mkdirSync(themesDiffDir)
}

function compareFile (filename) {
  var diffFile = themesDiffDir + '/' + filename

  var options = {
    file: diffFile,
    highlightColor: 'red',
    tolerance: 0.007
  }

  return new Promise((resolve, reject) => {
    gm().compare(
      themesDir + '/' + filename,
      themesOrigDir + '/' + filename,
      options,
      function (err, isEqual, equality, raw) {
        if(err) {
          return reject(err)
        }

        if(isEqual === true) {
          // remove the diff file if the images are the same
          fs.unlinkSync(diffFile)
        }

        return resolve(isEqual)
      })
  })
}


test.describe('Themes', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:9000/')
  })

  test('should download a picture for each theme', async ({page}) => {
    for (const theme of await page.locator('css=.themes-row a').all()) {
      const href = await theme.getAttribute('href')

      const downloadPromise = page.waitForEvent('download')

      await theme.click()
      await page.locator('css=button[ng-click*="DownloadPicture()"]').click()

      const download = await downloadPromise
      const filename = download.suggestedFilename()
      await download.saveAs(downloadDir + filename)

      const isEqual = await compareFile(filename)
      const message = `${filename} should be identical`
      expect(isEqual, message).toBe(true)

      console.log(`✅ ${message}`)
    }
  })
})
