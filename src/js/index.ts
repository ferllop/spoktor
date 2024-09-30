import { intersect } from './spoktor/digested-playlist.js'
import { generatePlaylistFrom } from './spoktor/playlist-generators/generators/m3u-output-playlist.js'
import { createLink } from './youtube-playlist-link-creator/youtube-playlist-link-creator.js'
import { AugmentedDigest, Digest } from './spoktor/digest.js'
import { parse } from './spoktor/parser/parser.js'
import { selectDataExtractor } from './spoktor/parser/data-extractor-selector.js'

let needles: Digest[]
let haystack: Digest[]
let downloadName: string
let result: AugmentedDigest[]

const needlesInput = document.getElementById('needles') as HTMLInputElement
const haystackInput = document.getElementById('haystack') as HTMLInputElement
const youtubeFormEl = document.querySelector('.yt-form') as HTMLFormElement

window.addEventListener('load', handleInitialLoad)
needlesInput.addEventListener('change', event => handleNeedleChange(event.target as HTMLInputElement))
haystackInput.addEventListener('change', event => handleHaystackChange(event.target as HTMLInputElement))
youtubeFormEl.querySelector('input[type="submit"]')
    ?.addEventListener('click', handleYoutubeLinkSubmit(youtubeFormEl))

function handleInitialLoad() {
    if (needlesInput.value) {
        handleNeedleChange(needlesInput)
    }
    if (haystackInput.value) {
        handleHaystackChange(haystackInput)
    }
}

async function handleNeedleChange(inputElement: HTMLInputElement) {
    const fileContent = await loadFileContent(inputElement)
    const dataExtractor = selectDataExtractor(fileContent)
    needles = parse(dataExtractor)(fileContent)
    downloadName = dataExtractor.extractPlaylistName(fileContent)
    makeResult()
}

async function handleHaystackChange(inputElement: HTMLInputElement) {
    const fileContent = await loadFileContent(inputElement)
    const dataExtractor = selectDataExtractor(fileContent)
    haystack = parse(dataExtractor)(fileContent)
    makeResult()
}

function loadFileContent(inputElement: HTMLInputElement): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!inputElement.files?.[0]) {
            return reject()
        }
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            if (fr.result && typeof fr.result === 'string') {
                return resolve(fr.result)
            }
        })
        fr.readAsText(inputElement.files[0])
    })
}

function makeResult() {
    const list = document.createElement('ol')
    const digests = getDigestsToRender()
    result = digests.map(digest => isAugmented(digest) ? digest : {...digest, coincidences: []})
    result.forEach((digest, indexA) => {
        const item = document.createElement('li')
        item.appendChild(templateWithContent(
            `Artist: ${digest.artist}<br />Song: ${digest.song}`).content)
        if (digest.coincidences.length > 0) {
            item.appendChild(makeCoincidences(digest, indexA))
        }
        list.appendChild(item)
    })
    renderResult(list)
}

function getDigestsToRender() {
    if (needles !== undefined && haystack !== undefined) {
        return intersect(needles, haystack)
    }

    if (needles !== undefined) {
        return needles
    }

    return []
}

function isAugmented(digest: Digest | AugmentedDigest): digest is AugmentedDigest {
    return 'coincidences' in digest
}

function templateWithContent(content: string) {
    const template = document.createElement('template')
    template.innerHTML = content
    return template
}

function makeCoincidences(digest: AugmentedDigest, indexA: number) {
    const sublist = document.createElement('ul')
    sublist.className = 'coincidences'
    digest.coincidences.forEach((digest, indexB) => {
        sublist.appendChild(templateWithContent(
            `
<li>
<label><input type="checkbox"
        data-playlist-position="${indexA}"
        data-coincidences-position="${indexB}"
        id="${indexA}-${indexB}" 
        checked>
Artist: ${digest.artist}<br />Song: ${digest.song}
</label></li>`).content)
    })
    return sublist
}

function renderResult(result: HTMLOListElement) {
    const resultEl = document.querySelector('.result')!
    const hasCoincidences = result.querySelector('.coincidences') !== null
    if (hasCoincidences) {
        resultEl.replaceChildren(makeDownloadButton())
    }
    resultEl.appendChild(result)
}

function makeDownloadButton() {
    const button = document.createElement('button')
    button.id = 'download'
    button.innerText = 'Download playlist with the selected coincidences'
    button.addEventListener('click', 
        () => download(
            `spoktor_-${downloadName}.m3u`,
            generatePlaylistFrom(getSelectedCoincidences(), downloadName)))
    return button
}

function download(filename: string, text: string) {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

function getSelectedCoincidences() {
    const selections: HTMLInputElement[] = Array.from(document.querySelectorAll('.result input[type="checkbox"]'))
    return selections
        .filter(selection => selection.checked)
        .map(selection => {
            const playlistPosition = Number.parseInt(selection.getAttribute('data-playlist-position')!)
            const coincidencesPosition = Number.parseInt(selection.getAttribute('data-coincidences-position')!)
            return result[playlistPosition].coincidences[coincidencesPosition]
        })
}

function handleYoutubeLinkSubmit(form: HTMLFormElement) {
    return (event: Event) => {
        console.log(form)
        event.preventDefault()
        const links = form.querySelector('textarea')!
        const anchor = templateWithContent(
            `<a href="${createLink(links.value)}" target="_blank" rel="noopener">Go to playlist</a>`)
        form.appendChild(anchor.content)
    }
}
