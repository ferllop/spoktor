import {AugmentedDigest, Digest} from '../../../domain/models/digest'
import {DigestedPlaylist} from '../../../domain/models/digested-playlist'
import {TraktorRawPlaylist} from '../../../domain/models/traktor-raw-playlist'
import {RawPlaylist} from '../../../domain/models/raw-playlist'
import {templateWithContent} from './helpers'
import {DigestComponent} from './digest-component'

const template = templateWithContent(`
<style>
ul {
    list-style-type: none;
}

ul li {
    margin-top: .5em;
}

ol li:not(:last-child) {
    margin-bottom: 1em;
}
</style>
`)

export class Result extends HTMLElement {
    shadow: ShadowRoot
    button?: HTMLButtonElement
    needles: Digest[] = []
    haystack: Digest[] = []
    result: AugmentedDigest[] = []
    downloadName: string = ''
    private intersectListener: EventListener
    private downloadListener: EventListener

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))

        this.downloadListener = () => {
            this.download(
                `spoktor_-${this.downloadName}.nml`,
                TraktorRawPlaylist.generatePlaylistFrom(this.result, this.downloadName))
        }

        this.intersectListener = () => {
            const coincidences = DigestedPlaylist.getNeedlesFromHaystack(this.needles, this.haystack)
            this.result = DigestedPlaylist.insertCoincidencesIntoDigests(coincidences, this.needles, Digest.areEqual)
            this.renderCoincidences()
        }
    }

    connectedCallback() {
        document.addEventListener('intersect', this.intersectListener)
        document.addEventListener('needles-load', (event: CustomEventInit) => {
            this.needles = RawPlaylist.digest(event.detail)
        })
        document.addEventListener('haystack-load', (event: CustomEventInit) => {
            this.haystack = RawPlaylist.digest(event.detail)
        })
    }

    disconnectedCallback() {
        document.addEventListener('intersect', this.intersectListener)
        this.button?.removeEventListener('click', this.downloadListener)
    }

    renderCoincidences() {
        const list = document.createElement('ol')
        this.result.forEach((augmentedDigest, indexA) => {
            const item = document.createElement('li')
            item.appendChild(templateWithContent(
                `<spk-digest song="${augmentedDigest.song}" 
                                    artist="${augmentedDigest.artist}"></spk-digest>`).content)


            const sublist = document.createElement('ul') as HTMLUListElement
            augmentedDigest.coincidences.forEach((digest, indexB) => {
                sublist.appendChild(templateWithContent(
                    `<li>
<label><input type="checkbox" id="${indexA}-${indexB}">
<spk-digest song="${digest.song}" 
                                    artist="${digest.artist}"></spk-digest></label></li>`).content)
            })
            const digestEl = item.querySelector('spk-digest') as DigestComponent
            digestEl.appendChild(sublist)
            list.appendChild(item)
        })

        // const coincidences = document.createElement('spk-needles') as Needles
        // coincidences.digests = this.result
        this.shadow.replaceChildren(template.content.cloneNode(true))
        this.insertDownloadButton()
        this.shadow.appendChild(list)
    }

    renderWhenEmpty(message: string) {
        const article = document.createElement('article')
        article.innerHTML = `<p>${message}</p>`
        this.shadow.replaceChildren(article)
    }

    insertDownloadButton() {
        const button = document.createElement('button')
        button.id = 'download'
        button.innerText = 'Download traktor playlist'
        button.addEventListener('click', this.downloadListener)
        this.button = button
        this.shadow.appendChild(button)
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
