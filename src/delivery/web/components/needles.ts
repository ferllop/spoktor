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
    digests: Digest[] = []
    loadListener: EventListener
    shadow: ShadowRoot

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))

        this.loadListener = (event: CustomEventInit) => {
            this.digests = RawPlaylist.digest(event.detail)
            this.renderDigests()
        }

    }

    connectedCallback() {
        document.addEventListener('spotify-playlist-load', this.loadListener)
    }

    disconnectedCallback() {
        document.addEventListener('spotify-playlist-load', this.loadListener)
    }

    renderDigests() {
        const ol: HTMLElement | null = this.shadow.querySelector('ol')
        if (!ol) {
            return
        }
        ol.innerHTML = ''
        this.digests.map(digest => {
            const item = document.createElement('li')
            item.innerHTML = 'Artist: ' + digest.artist +
                '<br />' + 'Song: ' + digest.song
            ol.appendChild(item)
        })
    }
}
