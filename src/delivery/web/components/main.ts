import {Form} from './form'
import {Needles} from './needles'
import {Haystack} from './haystack'

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

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))
    }
}
