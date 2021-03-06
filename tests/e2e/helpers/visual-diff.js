import ScreenshotTester from 'puppeteer-screenshot-tester'
import * as assert from 'uvu/assert'
import {startDevServer} from '@web/dev-server'

const screenshotPath = './screenshots'
const screenshotExtension = 'jpg'

export async function visualDiff(puppeteerPage, screenshotName) {
    const tester = await ScreenshotTester(0.8, false, false, {}, {
        transparency: 0.5,
    })

    const result = await tester(puppeteerPage, 'test', {
        saveNewImageOnError: true,
        fullPage: true,
        path: `${screenshotPath}/${screenshotName}.${screenshotExtension}`,
    })

    assert.ok(result)
}
