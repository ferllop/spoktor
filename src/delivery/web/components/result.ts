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

    constructor() {
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        document.addEventListener('needles-load', this.handleNeedlesLoaded.bind(this))
        document.addEventListener('haystack-load', this.handleHaystackLoaded.bind(this))
    }

    disconnectedCallback() {
        document.removeEventListener('needles-load', this.handleNeedlesLoaded.bind(this))
        document.removeEventListener('haystack-load', this.handleHaystackLoaded.bind(this))
        this.button?.removeEventListener('click', this.handleDownload.bind(this))
    }

    handleNeedlesLoaded(event: CustomEventInit) {
        this.needles = RawPlaylist.digest(event.detail)
        this.renderCoincidences()
    }

    handleHaystackLoaded(event: CustomEventInit) {
        if (this.needles.length === 0) {
            return
        }
        this.haystack = RawPlaylist.digest(event.detail)
        this.renderCoincidences()
    }

    handleDownload() {
        this.download(
            `spoktor_-${this.downloadName}.nml`,
            TraktorRawPlaylist.generatePlaylistFrom(this.getSelectedCoincidences(), this.downloadName))
    }

    getSelectedCoincidences() {
        const selections: NodeListOf<HTMLInputElement> = this.shadow.querySelectorAll('input[type="checkbox"]')
        return Array.from(selections)
            .filter((selection) => selection.checked)
            .map(selection => {
                const playlistPosition = Number.parseInt(selection.getAttribute('data-playlist-position')!)
                const coincidencesPosition = Number.parseInt(selection.getAttribute('data-coincidences-position')!)
                return this.result[playlistPosition]!.coincidences[coincidencesPosition]!
            })
    }

    intersect() {
        const coincidences = DigestedPlaylist.getNeedlesFromHaystack(this.needles, this.haystack)
        this.result = DigestedPlaylist.insertCoincidencesIntoDigests(coincidences, this.needles, Digest.areEqual)
    }

    renderCoincidences() {
        this.intersect()
        const list = document.createElement('ol')
        this.result.forEach((augmentedDigest, indexA) => {
            const item = document.createElement('li')
            item.appendChild(templateWithContent(
                `<spk-digest song="${augmentedDigest.song}" 
                                    artist="${augmentedDigest.artist}"></spk-digest>`).content)


            const sublist = document.createElement('ul') as HTMLUListElement
            augmentedDigest.coincidences.forEach((digest, indexB) => {
                sublist.appendChild(templateWithContent(
                    `
<li>
<label><input type="checkbox"
        data-playlist-position="${indexA}"
        data-coincidences-position="${indexB}"
        id="${indexA}-${indexB}" 
        ${augmentedDigest.coincidences.length === 1 ? 'checked' : ''}>
<spk-digest song="${digest.song}" 
            artist="${digest.artist}"></spk-digest>
${this.renderAudioPlayer(digest)}
</label></li>`).content)
            })
            const digestEl = item.querySelector('spk-digest') as DigestComponent
            digestEl.appendChild(sublist)
            list.appendChild(item)
        })

        this.shadow.replaceChildren(template.content.cloneNode(true))
        this.insertDownloadButton()
        this.shadow.appendChild(list)
    }

    renderAudioPlayer(digest: Digest) {
        const filename = TraktorRawPlaylist.normalizeRawFullFilePathFrom(TraktorRawPlaylist.renderFullFilePathFrom(digest.rawData))
        return `<audio controls
        src="${filename}">
            Your browser does not support the <code>audio</code> element.</audio>`

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
        button.addEventListener('click', this.handleDownload.bind(this))
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
