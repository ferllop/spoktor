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
    context.browser = await puppeteer.launch({timeout: 5000})
})

spoktor.before.each(async context => {
    context.page = await context.browser.newPage()
    await context.page.goto('http://localhost:9000')
})

spoktor.after.each(async ({page}) => {
    await page.close()
})

spoktor.after(async ({browser, server}) => {
    await browser.close()
    await server.stop()
})

spoktor('initial state', async ({page}) => {
    await visualDiff(page, 'initial')
})

spoktor('with only spotify playlist loaded', async ({page}) => {
    await loadSpotifyFile(page)
    await visualDiff(page, 'only-spotify-loaded')
})

spoktor('with only traktor collection loaded', async ({page}) => {
    await loadTraktorFile(page)
    await visualDiff(page, 'only-traktor-loaded')
})

spoktor('with spotify and traktor intersected', async ({page}) => {
    await loadSpotifyFile(page)
    await loadTraktorFile(page)
    await visualDiff(page, 'both-spotify-and-traktor-loaded')
})

spoktor('when traktor collection is loaded first', async ({page}) => {
    await loadTraktorFile(page)
    await loadSpotifyFile(page)
    await visualDiff(page, 'traktor-loaded-first')
})

spoktor('with a list of youtube videos', async ({page}) => {
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
