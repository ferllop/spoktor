import {RawPlaylist} from '../../../domain/models/raw-playlist'
import {Digest} from '../../../domain/models/digest'

const template = document.createElement('template')
template.innerHTML = `
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
`

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
            item.innerHTML = 'Artist: ' + digest.artist +
                '<br />' + 'Song: ' + digest.song
            ol.appendChild(item)
        })
    }
}
