import {Spoktor} from '../../domain/spoktor.js'

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
        spotifyPlaylist = null
        traktorPlaylist = null
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {

        const spotify = this.shadowRoot.getElementById('spotify')
        spotify.addEventListener('change', event => {
            this.loadSpotifyFile(event.target)
        })

        const traktor = this.shadowRoot.getElementById('traktor')
        traktor.addEventListener('change', event => {
            this.loadTraktorFile(event.target)
        })

        window.addEventListener('load', () => {
            if (spotify.value) {
                this.loadSpotifyFile(spotify)
            }
            if (traktor.value) {
                this.loadTraktorFile(traktor)
            }
        })

        const submit = this.shadowRoot.querySelector('input[type="submit"]')
        submit.addEventListener('click', (event) => {
            event.preventDefault()
            const spoktor = new Spoktor(this.spotifyPlaylist, this.traktorPlaylist)
            const result = spoktor.getCoincidentDigests()
            this.shadowRoot.dispatchEvent(new CustomEvent('spoktor', {bubbles: true, detail: result}))
        })


        const result = this.shadowRoot.getElementById('result')
        this.shadowRoot.addEventListener('spoktor', event => {
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
        loadTraktorFile(inputElement) {
            const fr = new FileReader()
            fr.addEventListener('load', () => {
                this.traktorPlaylist = fr.result
            })
            fr.readAsText(inputElement.files[0])
        }

        loadSpotifyFile(inputElement) {
            const aside = this.shadowRoot.getElementById('spotify-content')
            const fr = new FileReader()
            fr.addEventListener('load', () => {
                this.spotifyPlaylist = fr.result
                aside.innerHTML = ''
                this.renderDigests(Spoktor.getDigestsFor(this.spotifyPlaylist), aside)
            })
            fr.readAsText(inputElement.files[0])
        }


        renderNoCoincidences(parentElement) {
            parentElement.innerHTML = ''
            const article = document.createElement('article')
            article.innerText = 'There are no coincidences'
            parentElement.appendChild(article)
        }

        insertDownloadButton(parent, fileContent, filename) {
            const button = document.createElement('button')
            button.innerText = 'Download traktor playlist'
            button.addEventListener('click', () => {
                this.download('spoktor_-' + filename + '.nml', fileContent)
            })
            parent.appendChild(button)
        }

        renderDigests(digests, parentElement) {
            const list = document.createElement('ol')
            digests.map(digest => {
                const item = document.createElement('li')
                item.innerHTML = 'Artist: ' + digest.digest.artist +
                    '<br />' + 'Song: ' + digest.digest.song
                list.appendChild(item)
            })
            parentElement.appendChild(list)
        }

        download(filename, text) {
            const element = document.createElement('a')
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
            element.setAttribute('download', filename)
            element.style.display = 'none'
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        }



}
