import {Spoktor} from '../../domain/spoktor'
import {RawPlaylist} from '../../domain/models/raw-playlist'
import {Digest} from '../../domain/models/digest'
import {Form} from './form'

customElements.define('spk-form', Form)

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

li {
    margin-bottom: 1em;
}
</style>
<aside id="spotify-content"></aside>
<section>
    <h1>SPOKTOR</h1>
    <spk-form></spk-form>
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
        const form: HTMLFormElement | null = this.shadow.querySelector('spk-form')
        if (!form) {
            return
        }
        form.addEventListener('intersect', () => {
            const result: HTMLElement | null = this.shadow.getElementById('result')
            if (!this.spotifyPlaylist || !this.traktorPlaylist || !result) {
                return
            }
            const spoktor = new Spoktor(this.spotifyPlaylist, this.traktorPlaylist)
            const digests = spoktor.getCoincidentDigests()
            if (digests.length === 0) {
                return this.renderNoCoincidences(result)
            }
            result.innerHTML = ''
            this.insertDownloadButton(result, spoktor.getTraktorPlaylist(), spoktor.getPlaylistNameFrom(this.spotifyPlaylist))
            this.renderDigests(digests, result)
        })

        const traktorLoadListener = (event: CustomEventInit) => {
            this.traktorPlaylist = event.detail
        }
        form.addEventListener('traktor-collection-load', traktorLoadListener)

        const spotifyLoadListener = (event: CustomEventInit) => {
            const aside: HTMLElement | null = this.shadow.getElementById('spotify-content')
            this.spotifyPlaylist = event.detail
            if (!aside || !this.spotifyPlaylist) {
                return
            }
            aside.innerHTML = ''
            this.renderDigests(RawPlaylist.digest(this.spotifyPlaylist), aside)
        }
        form.addEventListener('spotify-playlist-load', spotifyLoadListener)
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
