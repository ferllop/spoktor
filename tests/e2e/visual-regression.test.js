import {suite} from 'uvu'
import puppeteer from 'puppeteer/lib/cjs/puppeteer/puppeteer.js'
import {visualDiff} from './helpers/visual-diff.js'
import {uploadFile} from './helpers/puppeteer-commands.js'
import {startDevServer} from '@web/dev-server'
import {devLocalConfig} from '../../dev-local-config.js'

const spoktor = suite('e2e spoktor')

spoktor.before(async context => {
    context.server = await startDevServer({
        argv: [`--port=${devLocalConfig.testServerPort}`]
    })
})

spoktor.after( async context => {
    await context.server.stop()
})

spoktor('initial state', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:9000', {waitUntil: 'networkidle0'})
    await visualDiff(page, 'initial')
    await browser.close()
})

spoktor('with spotify playlist loaded', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:9000', {waitUntil: 'networkidle0'})
    await loadSpotifyFile(page)
    await visualDiff(page, 'only-spotify-loaded')
    await browser.close()
})

spoktor('with spotify and traktor intersected', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:9000', {waitUntil: 'networkidle0'})
    await loadSpotifyFile(page)
    await loadTraktorFile(page)
    await visualDiff(page, 'both-spotify-and-traktor-loaded')
    await browser.close()
})

spoktor('with a list of youtube videos', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://localhost:9000', {waitUntil: 'networkidle0'})
    await page.type('.youtube-playlist textarea', 'https://www.youtube.com/watch?v=aaaaaaaaaaa')
    await page.click('.youtube-playlist input[type="submit"]')
    await visualDiff(page, 'with-youtube-links')
    await browser.close()
})

async function loadSpotifyFile(page) {
    return uploadFile(page,
        import.meta,
        'test-data/spotify-playlist.txt',
         '#needles',
        )
}

async function loadTraktorFile(page) {
    return uploadFile(page,
        import.meta,
        'test-data/traktor-collection.nml',
        '#haystack',
        )
}

 spoktor.run()
