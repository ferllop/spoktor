import {suite} from 'uvu'
import puppeteer from 'puppeteer/lib/cjs/puppeteer/puppeteer.js'
import {visualDiff} from './helpers/visual-diff.js'
import {uploadFiles} from './helpers/puppeteer-commands.js'
import {startDevServer} from '@web/dev-server'
import {devLocalConfig} from '../../dev-local-config.js'
import { Page } from 'puppeteer'

const spoktor = suite('e2e spoktor')

spoktor.before(async context => {
    context.server = await startDevServer({
        argv: [`--port=${devLocalConfig.testServerPort}`]
    })
    context.browser = await puppeteer.launch()
})

spoktor.before.each(async context => {
    context.page = await context.browser.newPage()
})

spoktor.after.each(async context => {
    await context.page.close()
})

spoktor.after(async context => {
    await context.browser.close()
    await context.server.stop()
})

spoktor('initial state', async ({page}) => {
    await page.goto('http://localhost:9000')
    await visualDiff(page, 'initial')
})

spoktor('with spotify playlist loaded', async ({page}) => {
    await page.goto('http://localhost:9000')
    await loadSpotifyFile(page)
    await visualDiff(page, 'only-spotify-loaded')
})

spoktor('with spotify and traktor intersected', async ({page}) => {
    await page.goto('http://localhost:9000')
    await loadSpotifyFile(page)
    await loadTraktorFile(page)
    await visualDiff(page, 'both-spotify-and-traktor-loaded')
})

spoktor('with a list of youtube videos', async ({page}) => {
    await page.goto('http://localhost:9000')
    await page.type('.youtube-playlist textarea', 'https://www.youtube.com/watch?v=aaaaaaaaaaa')
    await page.click('.youtube-playlist input[type="submit"]')
    await visualDiff(page, 'with-youtube-links')
})

async function loadSpotifyFile(page: Page) {
    return uploadFiles(page,
        import.meta,
        ['test-data/spotify-playlist.txt'],
         '#needles',
        )
}

async function loadTraktorFile(page: Page) {
    return uploadFiles(page,
        import.meta,
        ['test-data/traktor-collection.nml'],
        '#haystack',
        )
}

spoktor.run()
