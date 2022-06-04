import {Spoktor} from '../../domain/spoktor'
import {RawPlaylist} from '../../domain/models/raw-playlist'
import {Digest} from '../../domain/models/digest'

const template = document.createElement('template')
template.innerHTML = `
<style>
:host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
}

aside {
    font-size: 0.9rem;
}

h1 {
    text-align: center;
    padding-bottom: 1em;
}

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

li {
    margin-bottom: 1em;
}
</style>
<aside id="spotify-content"></aside>
<section>
    <h1>SPOKTOR</h1>
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
</section>
<section id="result"></section>`

export class Main extends HTMLElement {
    private shadow: ShadowRoot
    private spotifyPlaylist: string | null = null
    private traktorPlaylist: string | null = null

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
            if (!this.spotifyPlaylist || !this.traktorPlaylist) {
                return
            }
            const spoktor = new Spoktor(this.spotifyPlaylist, this.traktorPlaylist)
            const result = spoktor.getCoincidentDigests()
            this.shadow.dispatchEvent(new CustomEvent('spoktor', {bubbles: true, detail: result}))
        })


        const result: HTMLElement | null = this.shadow.getElementById('result')
        this.shadow.addEventListener('spoktor', (event: CustomEventInit) => {
            if (!this.spotifyPlaylist || !this.traktorPlaylist || !result) {
                return
            }
            const digests = event.detail
            if (digests.length === 0) {
                return this.renderNoCoincidences(result)
            }
            result.innerHTML = ''
            const spoktor = new Spoktor(this.spotifyPlaylist, this.traktorPlaylist)
            this.insertDownloadButton(result, spoktor.getTraktorPlaylist(), spoktor.getPlaylistNameFrom(this.spotifyPlaylist))
            this.renderDigests(digests, result)
        })

    }

    loadTraktorFile(inputElement: HTMLInputElement) {
        if (!inputElement.files?.[0]) {
            return
        }
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            this.traktorPlaylist = fr.result as string
        })
        fr.readAsText(inputElement.files[0])
    }

    loadSpotifyFile(inputElement: HTMLInputElement) {
        const aside: HTMLElement | null = this.shadow.getElementById('spotify-content')
        if (!aside || !inputElement.files?.[0]) {
            return
        }
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            this.spotifyPlaylist = fr.result as string
            aside.innerHTML = ''
            this.renderDigests(RawPlaylist.digest(this.spotifyPlaylist), aside)
        })
        fr.readAsText(inputElement.files[0])
    }


    renderNoCoincidences(parentElement: HTMLElement) {
        parentElement.innerHTML = ''
        const article = document.createElement('article')
        article.innerText = 'There are no coincidences'
        parentElement.appendChild(article)
    }

    insertDownloadButton(parent: HTMLElement, fileContent: string, filename: string) {
        const button = document.createElement('button')
        button.innerText = 'Download traktor playlist'
        button.addEventListener('click', () => {
            this.download('spoktor_-' + filename + '.nml', fileContent)
        })
        parent.appendChild(button)
    }

    renderDigests(digests: Digest[], parentElement: HTMLElement) {
        const list = document.createElement('ol')
        digests.map(digest => {
            const item = document.createElement('li')
            item.innerHTML = 'Artist: ' + digest.artist +
                '<br />' + 'Song: ' + digest.song
            list.appendChild(item)
        })
        parentElement.appendChild(list)
    }

    download(filename: string, text: string) {
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
        element.setAttribute('download', filename)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }


}
