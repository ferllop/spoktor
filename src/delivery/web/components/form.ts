const template = document.createElement('template')
template.innerHTML = `
<style>
form {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
}

fieldset:not(:last-child) {
    margin-bottom: 1.5em;
}

input[type="submit"] {
    padding: 1em;
}
</style>
<form action="">
        <fieldset>
            <label for="spotify">Spotify Playlist:</label>
            <input type="file" id="spotify">
        </fieldset>

        <fieldset>
            <label for="traktor">Traktor Collection:</label>
            <input type="file" id="traktor">
        </fieldset>

        <input type="submit" value="Intersect">
    </form>
`

export class Form extends HTMLElement {

    private shadow: ShadowRoot

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        const spotify = this.shadow.getElementById('spotify') as HTMLInputElement
        spotify.addEventListener('change', event => {
            this.loadSpotifyFile(event.target as HTMLInputElement)
        })

        const traktor = this.shadow.getElementById('traktor') as HTMLInputElement
        traktor.addEventListener('change', event => {
            this.loadTraktorFile(event.target as HTMLInputElement)
        })

        window.addEventListener('load', () => {
            if (spotify.value) {
                this.loadSpotifyFile(spotify)
            }
            if (traktor.value) {
                this.loadTraktorFile(traktor)
            }
        })

        const submit = this.shadow.querySelector('input[type="submit"]') as HTMLInputElement
        submit.addEventListener('click', (event) => {
            event.preventDefault()
            if (!spotify.value || !traktor.value) {
                return
            }
            this.shadow.dispatchEvent(new Event('intersect', {
                bubbles: true,
                composed: true,
            }))
        })

    }

    loadTraktorFile(inputElement: HTMLInputElement) {
        if (!inputElement.files?.[0]) {
            return
        }
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            this.dispatchEvent(new CustomEvent('traktor-collection-load', {
                bubbles: true,
                detail: fr.result as string,
            }))
        })
        fr.readAsText(inputElement.files[0])
    }

    loadSpotifyFile(inputElement: HTMLInputElement) {
        if (!inputElement.files?.[0]) {
            return
        }
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            this.dispatchEvent(new CustomEvent('spotify-playlist-load', {
                bubbles: true,
                composed: true,
                detail: fr.result as string,
            }))
        })
        fr.readAsText(inputElement.files[0])
    }

}
