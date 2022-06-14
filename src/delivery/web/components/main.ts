import {Form} from './form'
import {DigestComponent} from './digest-component'
import {Result} from './result'
import {YoutubePlaylistComponent} from './yt-playlist'

customElements.define('spk-result', Result)
customElements.define('spk-form', Form)
customElements.define('spk-digest', DigestComponent)
customElements.define('spk-yt-playlist', YoutubePlaylistComponent)


const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    display: flex;

}

h1 {
    text-align: center;
    padding-bottom: 1em;
}
</style>
<aside>
    <section>
        <h1>SPOKTOR</h1>
        <spk-form></spk-form>
    </section>
    <section>
        <h2>Youtube videos list to playlist</h2>
        <spk-yt-playlist></spk-yt-playlist>
    </section>
</aside>
<spk-result></spk-result>`

export class Main extends HTMLElement {
    private shadow: ShadowRoot

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))
    }
}
