import { intersect } from '../domain/digested-playlist.js'
import { generatePlaylistFrom } from '../domain/playlist-generators/generators/m3u-output-playlist.js'
import { ComparedDigest, Digest } from '../domain/digest.js'
import { parse } from '../domain/parser/parser.js'
import { selectDataExtractor } from '../domain/parser/data-extractor-selector.js'
import { pipe } from '../../lib/fp.js'

const state = {
    downloadName: '',
    haystack: new Array<Digest>(),
    needles: new Array<Digest>(),    
}

Array.from<HTMLInputElement>(
    document.querySelectorAll('input[type="file"]'))
    .forEach(input => 
        input.addEventListener('change', handleInputChange))

window.addEventListener('load', handleInitialLoad)

function handleInitialLoad(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        return
    }
    handleInputChange(event)
}

async function handleInputChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)){
        return
    }

    const fileContent = await getFileContent(event.target)
    const dataExtractor = selectDataExtractor(fileContent)

    if (event.target.matches('#haystack')) {
        state.haystack = pipe(fileContent, parse(dataExtractor))
    }

    if (event.target.matches('#needles')) {
        state.needles = pipe(fileContent, parse(dataExtractor))
        state.downloadName = dataExtractor.extractPlaylistName(fileContent).replaceAll(' ', '_')
    }

    buildResultHtml()
}

function getFileContent(inputElement: HTMLInputElement): Promise<string> {
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

function buildResultHtml() {
    const comparedDigests = intersect(state.needles, state.haystack)
    const list = document.createElement('ol')
    list.innerHTML = comparedDigests.map(buildResultItemHtml).join('')
    putResult(list, comparedDigests, state.downloadName)
}

function buildResultItemHtml(digest: ComparedDigest, indexA: number) {
    return `<li>
        Artist: ${digest.artist}<br />Song: ${digest.song}
        ${digest.coincidences.length > 0 ? buildCoincidences(digest.coincidences, indexA) : ''}
    </li>`
}

function buildCoincidences(digests: Digest[], indexA: number) {
    return `<ul class="coincidences">
    ${digests.map((digest, indexB) => buildCoincidence(indexA, indexB, digest)).join('')}
    </ul>`
}

function buildCoincidence(indexA: number, indexB: number, digest: Digest) {
    return `<li><label>
            <input type="checkbox"
                data-playlist-position="${indexA}"
                data-coincidences-position="${indexB}"
                id="${indexA}-${indexB}"
                checked />
            Artist: ${digest.artist}<br />Song: ${digest.song}
        </label></li>`
}

function putResult(result: HTMLOListElement, comparedDigests: ComparedDigest[], downloadName: string) {
    const resultEl = document.querySelector('.result')!
    const hasCoincidences = result.querySelector('.coincidences') !== null
    if (hasCoincidences) {
        resultEl.replaceChildren(
            buildDownloadButton(comparedDigests, downloadName),
            makeNoSelectedCoincidencesDialog())
    }
    resultEl.appendChild(result)
}

function buildDownloadButton(comparedDigests: ComparedDigest[], downloadName: string) {
    const button = document.createElement('button')
    button.id = 'download'
    button.innerText = 'Download playlist with the selected coincidences'
    button.addEventListener('click', 
        handleDownload(downloadName, comparedDigests))
    return button
}

function makeNoSelectedCoincidencesDialog() {
    const template = document.createElement('template')
    template.innerHTML = 
        `<dialog id="no-selected-coincidences">
            <p>There are no selected coincidences</p>
            <form method="dialog">
                <button>OK</button>
            </form>
        </dialog>`
    return template.content
}

function handleDownload(downloadName: string, comparedDigests: ComparedDigest[]) {
    return () => {
        const coincidences: HTMLInputElement[] =
        Array.from(document.querySelectorAll('.coincidences [type="checkbox"]'))
        const selected = coincidences.filter(coincidence => coincidence.checked)

        if (!selected.length) {
            document.querySelector('dialog#no-selected-coincidences')!.setAttribute('open', 'true')
            return
        }
        
        const playlist: string = pipe(
            comparedDigests, 
            getSelectedCoincidences(selected), 
            generatePlaylistFrom(downloadName))

        const filenameToDownload = `spoktor-${downloadName}.m3u`
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(playlist))
        element.setAttribute('download', filenameToDownload)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }
}

function getSelectedCoincidences(selections: HTMLInputElement[]) {
    return (comparedDigests: ComparedDigest[]) => 
        selections.map(selection => {
            const playlistPosition = Number.parseInt(
                selection.getAttribute('data-playlist-position')!)
            const coincidencesPosition = Number.parseInt(
                selection.getAttribute('data-coincidences-position')!)

            return comparedDigests[playlistPosition].coincidences[coincidencesPosition]
        })
}