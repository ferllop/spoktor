import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {visualDiff} from './helpers/visual-diff.js'
import {uploadFiles} from './helpers/puppeteer-commands.js'
import {startDevServer} from '@web/dev-server'
import {devLocalConfig} from '../../dev-local-config.js'
import { launch, Browser, Page } from 'puppeteer'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'

const spoktor = suite<Context>('e2e spoktor')

type Context = {
    server: Awaited<ReturnType<typeof startDevServer>>,
    browser: Browser,
    page: Page,
}
spoktor.before(async context => {
    context.server = await startDevServer({
        argv: [`--port=${devLocalConfig.testServerPort}`]
    })
    context.browser = await launch({
        timeout: 5000, 
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
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

spoktor('with selected coincidences downloads a playlist with the selected coincidences', async ({page}) => {
    const client = await page.target().createCDPSession()
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: './tests/e2e/screenshots/',
    })

    await loadSpotifyFile(page)
    await loadTraktorFile(page)
    await page.click('#download')
    await page.waitForNetworkIdle()

    const downloadedPlaylist = readFileSync(
        resolve(import.meta.dirname, './screenshots/spoktor-4_de_Junio_2022.m3u'), 'utf8')

    const correctPlaylist = readFileSync(
        resolve(import.meta.dirname, './test-data/correct-playlist.m3u'), 'utf8')

    assert.equal(downloadedPlaylist, correctPlaylist)
})

spoktor('with no selected coincidences shows a dialog alerting of it', async ({page}) => {
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });
    await loadSpotifyFile(page)
    await loadTraktorFile(page)

    await page.$$eval(".coincidences label", 
        async els => await els.forEach(async el => await el.click()))

    await page.click('#download')

    await visualDiff(page, 'with-no-coincidences-selected')
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
