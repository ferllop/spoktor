import {fixture, html} from '@open-wc/testing'
import {visualDiff} from '@web/test-runner-visual-regression'
import {Main} from '../../../src/delivery/web/main.js'
import {executeServerCommand} from '@web/test-runner-commands'

customElements.define('spk-main', Main)

describe('MyElement Visual diffing', () => {
    it('initial state', async () => {
        await fixture(html`<spk-main></spk-main>`)
        await visualDiff(document.body, 'spk-main-initial')
    })

    it('with spotify playlist loaded', async () => {
        await fixture(html`<spk-main></spk-main>`)
        await loadSpotifyFile()
        await visualDiff(document.body, 'spk-main-spotify-only')
    })

    it('with spotify and traktor intersected', async () => {
        await fixture(html`<spk-main></spk-main>`)
        await loadSpotifyFile()
        await loadTraktorFile()
        await intersect()
        await visualDiff(document.body, 'spk-main-intersect')
    })


})

async function loadSpotifyFile() {
    return executeServerCommand(
        'upload-file',
        {
            selector: `document.querySelector('spk-main').shadowRoot.querySelector('#spotify')`,
            filePaths: 'test-data/spotify-playlist.txt'
        })
}

async function loadTraktorFile() {
    return executeServerCommand(
        'upload-file',
        {
            selector: `document.querySelector('spk-main').shadowRoot.querySelector('#traktor')`,
            filePaths: 'test-data/traktor-collection.nml'
        })
}

async function intersect() {
    return executeServerCommand(
        'shadow-root-click',
        {
            selector: `document.querySelector('spk-main').shadowRoot.querySelector('input[type="submit"]')`,
        })
}
