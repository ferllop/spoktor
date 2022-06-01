import {fixture, html} from '@open-wc/testing'
import {visualDiff} from '@web/test-runner-visual-regression'
import {Main} from '../../../src/delivery/web/main.js'

customElements.define('spk-main', Main)

describe('MyElement Visual diffing', () => {
    it('no title', async () => {
        fixture(html`<spk-main></spk-main>`)
        await visualDiff(document.body, 'spk-main')
    })
})
