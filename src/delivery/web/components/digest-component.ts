export class DigestComponent extends HTMLElement {
    shadow: ShadowRoot

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    connectedCallback() {
        const artist = this.getAttribute('artist')
        const song = this.getAttribute('song')
        this.shadow.innerHTML = `Artist: ${artist}<br />Song: ${song}`
        const slot = document.createElement('slot')
        this.shadow.appendChild(slot)
    }

}
