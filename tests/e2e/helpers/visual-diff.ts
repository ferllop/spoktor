import { Page } from 'puppeteer'
import ScreenshotTester from 'puppeteer-screenshot-tester'
import * as assert from 'uvu/assert'

const screenshotPath = './tests/e2e/screenshots'
const screenshotExtension = 'jpg'

export async function visualDiff(puppeteerPage: Page, screenshotName: string) {
    const tester = await ScreenshotTester(0.8, false, false, {}, {
        transparency: 0.5,
    })
    await puppeteerPage.waitForNetworkIdle()

    const result = await tester(puppeteerPage, 'test', {
        saveNewImageOnError: true,
        fullPage: true,
        path: `${screenshotPath}/${screenshotName}.${screenshotExtension}`,
    })

    assert.ok(result)
}
