import {RawPlaylist} from '../../../domain/models/raw-playlist'
import {Digest} from '../../../domain/models/digest'
import {templateWithContent} from './helpers'

const template = templateWithContent(`
<style>
aside {
    font-size: 0.9rem;
}

li {
    margin-bottom: 1em;
}
</style>
<aside>
<ol></ol>
</aside>
`)

export class Needles extends HTMLElement {
    private values: Digest[] = []
    private loadListener: EventListener
    private shadow: ShadowRoot

    set digests(digests: Digest[]) {
        this.values = digests
        this.renderDigests()
    }

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))

        this.loadListener = (event: CustomEventInit) => {
            this.digests = RawPlaylist.digest(event.detail)
        }
    }

    connectedCallback() {
        document.addEventListener('needles-load', this.loadListener)
    }

    disconnectedCallback() {
        document.addEventListener('needles-load', this.loadListener)
    }

    renderDigests() {
        const ol: HTMLElement | null = this.shadow.querySelector('ol')
        if (!ol) {
            return
        }
        ol.innerHTML = ''
        this.values.map(digest => {
            const item = document.createElement('li')
            const template = templateWithContent(
                `<spk-digest song="${digest.song}" 
                                    artist="${digest.artist}"></spk-digest>`)
            item.appendChild(template.content)
            ol.appendChild(item)
        })
    }
}


