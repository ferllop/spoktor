import {Digest} from '../../../domain/models/digest'
import {DigestedPlaylist} from '../../../domain/models/digested-playlist'
import {TraktorRawPlaylist} from '../../../domain/models/traktor-raw-playlist'
import {Needles} from './needles'
import {RawPlaylist} from '../../../domain/models/raw-playlist'

export class Haystack extends HTMLElement {
    shadow: ShadowRoot
    button?: HTMLButtonElement
    needles: Digest[] = []
    digests: Digest[] = []
    coincidences: Digest[] = []
    downloadName: string = ''
    private intersectListener: EventListener
    private downloadListener: EventListener

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})

        this.downloadListener = () => {
            this.download(
                `spoktor_-${this.downloadName}.nml`,
                TraktorRawPlaylist.generatePlaylistFrom(this.coincidences, this.downloadName))
        }

        this.intersectListener = () => {
            this.coincidences = DigestedPlaylist.getNeedlesFromHaystack(this.needles, this.digests)
            this.renderCoincidences()
        }
    }

    connectedCallback() {
        document.addEventListener('intersect', this.intersectListener)
        document.addEventListener('needles-load', (event: CustomEventInit) => {
            this.needles = RawPlaylist.digest(event.detail)
        })
        document.addEventListener('haystack-load', (event: CustomEventInit) => {
            this.digests = RawPlaylist.digest(event.detail)
        })
    }

    disconnectedCallback() {
        document.addEventListener('intersect', this.intersectListener)
        this.button?.removeEventListener('click', this.downloadListener)
    }

    renderCoincidences() {
        if (this.coincidences.length === 0) {
            return this.renderWhenEmpty('There are no coincidences')
        }

        const list = document.createElement('spk-needles') as Needles
        list.digests = this.coincidences
        this.shadow.replaceChildren()
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
