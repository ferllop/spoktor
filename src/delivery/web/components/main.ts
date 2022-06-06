import {Form} from './form'
import {Needles} from './needles'
import {Haystack} from './haystack'

export type RawPlaylistLoadEvent = CustomEventInit & {
    detail: string
}

customElements.define('spk-needles', Needles)
customElements.define('spk-haystack', Haystack)
customElements.define('spk-form', Form)

const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
}


h1 {
    text-align: center;
    padding-bottom: 1em;
}
</style>
<spk-needles></spk-needles>
<section>
    <h1>SPOKTOR</h1>
    <spk-form></spk-form>
</section>
<spk-haystack></spk-haystack>`

export class Main extends HTMLElement {
    private shadow: ShadowRoot
    // private needles: Digest[] = []
    // private haystackLoadListener: EventListener
    // private needlesLoadListener: EventListener

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))

        // this.haystackLoadListener = (event: CustomEventInit) => {
        //     const haystack: Haystack | null = this.shadow.querySelector('spk-haystack')!
        //     haystack.digests = RawPlaylist.digest(event.detail)
        // }

        // this.needlesLoadListener = (event: CustomEventInit) => {
        //     this.needles = RawPlaylist.digest(event.detail)
        //     const needlesEl: Needles | null = this.shadow.querySelector('spk-needles')
        //     if(needlesEl) {
        //         needlesEl.digests = this.needles
        //     }
        // }
    }

    connectedCallback() {
        // const form = this.shadow.querySelector('spk-form')
        // form?.addEventListener('traktor-collection-load', this.haystackLoadListener)
        // form?.addEventListener('spotify-playlist-load', this.needlesLoadListener)
    }

    disconnectedCallback() {
        // const form = this.shadow.querySelector('spk-form')
        // form?.removeEventListener('traktor-collection-load', this.haystackLoadListener)
        // form?.removeEventListener('spotify-playlist-load', this.needlesLoadListener)
    }

}
