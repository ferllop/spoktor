import {fixture, html} from '@open-wc/testing'
import {visualDiff} from '@web/test-runner-visual-regression'
import {Main} from '../../../src/delivery/web/components/main'
import {executeServerCommand} from '@web/test-runner-commands'
import { sendKeys } from '@web/test-runner-commands'

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
        await visualDiff(document.body, 'spk-main-intersect')
    })

    it('with a list of youtube videos', async () => {
        const el = await fixture(html`<spk-main></spk-main>`)
        const textarea = el.shadowRoot!.querySelector('.youtube-playlist textarea') as HTMLTextAreaElement
        textarea.focus()
        await sendKeys({
            type: 'https://www.youtube.com/watch?v=aaaaaaaaaaa'
        })
        const submit = el.shadowRoot!.querySelector('.youtube-playlist input[type="submit"]') as HTMLInputElement
        submit.click()
        await visualDiff(document.body, 'spk-with-youtube-links')
    })
})

async function loadSpotifyFile() {
    return executeServerCommand(
        'upload-file',
        {
            selector: `document.querySelector('spk-main').shadowRoot.querySelector('spk-form').shadowRoot.querySelector('#needles')`,
            filePaths: 'test-data/spotify-playlist.txt'
        })
}

async function loadTraktorFile() {
    return executeServerCommand(
        'upload-file',
        {
            selector: `document.querySelector('spk-main').shadowRoot.querySelector('spk-form').shadowRoot.querySelector('#haystack')`,
            filePaths: 'test-data/traktor-collection.nml'
        })
}
