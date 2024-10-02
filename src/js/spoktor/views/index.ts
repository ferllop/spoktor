import { intersect } from '../domain/digested-playlist.js'
import { generatePlaylistFrom } from '../domain/playlist-generators/generators/m3u-output-playlist.js'
import { ComparedDigest, Digest } from '../domain/digest.js'
import { parse } from '../domain/parser/parser.js'
import { selectDataExtractor } from '../domain/parser/data-extractor-selector.js'

let needles: Digest[] = []
let haystack: Digest[] = []
let downloadName: string

const needlesInput = document.getElementById('needles') as HTMLInputElement
const haystackInput = document.getElementById('haystack') as HTMLInputElement

window.addEventListener('load', handleInitialLoad)
needlesInput.addEventListener('change', handleNeedleChange)
haystackInput.addEventListener('change', handleHaystackChange)

function handleInitialLoad(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        return
    }
    if (needlesInput.value) {
        handleNeedleChange(event)
    }
    if (haystackInput.value) {
        handleHaystackChange(event)
    }
}

async function handleNeedleChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)){
        return
    }
    const fileContent = await loadFileContent(event.target)
    const dataExtractor = selectDataExtractor(fileContent)
    needles = parse(dataExtractor)(fileContent)
    downloadName = dataExtractor.extractPlaylistName(fileContent).replaceAll(' ', '_')
    makeResult()
}

async function handleHaystackChange(event: Event) {
    if (!(event.target instanceof HTMLInputElement)){
        return
    }
    const fileContent = await loadFileContent(event.target)
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
    const comparedDigests = intersect(needles, haystack)
    const list = document.createElement('ol')
    
    comparedDigests.forEach((digest, indexA) => {
        const item = document.createElement('li')
        item.appendChild(templateWithContent(
            `Artist: ${digest.artist}<br />Song: ${digest.song}`).content)
        if (digest.coincidences.length > 0) {
            item.appendChild(makeCoincidences(digest.coincidences, indexA))
        }
        list.appendChild(item)
    })

    renderResult(list, comparedDigests, downloadName)
}

function templateWithContent(content: string) {
    const template = document.createElement('template')
    template.innerHTML = content
    return template
}

function makeCoincidences(digests: Digest[], indexA: number) {
    const sublist = document.createElement('ul')
    sublist.className = 'coincidences'
    digests.forEach((digest, indexB) => {
        sublist.appendChild(templateWithContent(
            `<li>
                <label>
                    <input type="checkbox"
                        data-playlist-position="${indexA}"
                        data-coincidences-position="${indexB}"
                        id="${indexA}-${indexB}"
                        checked />
                    Artist: ${digest.artist}<br />Song: ${digest.song}
                </label>
            </li>`
        ).content)
    })
    return sublist
}

function renderResult(result: HTMLOListElement, comparedDigests: ComparedDigest[], downloadName: string) {
    const resultEl = document.querySelector('.result')!
    const hasCoincidences = result.querySelector('.coincidences') !== null
    if (hasCoincidences) {
        resultEl.replaceChildren(
            makeDownloadButton(comparedDigests, downloadName),
            makeNoSelectedCoincidencesDialog())
    }
    resultEl.appendChild(result)
}

function makeDownloadButton(comparedDigests: ComparedDigest[], downloadName: string) {
    const button = document.createElement('button')
    button.id = 'download'
    button.innerText = 'Download playlist with the selected coincidences'
    button.addEventListener('click', 
        handleDownload(`spoktor-${downloadName}.m3u`, comparedDigests))
    return button
}

function makeNoSelectedCoincidencesDialog() {
    return templateWithContent(
        `<dialog id="no-selected-coincidences">
            <p>There are no selected coincidences</p>
            <form method="dialog">
                <button>OK</button>
            </form>
        </dialog>`
    ).content
}

function handleDownload(filename: string, comparedDigests: ComparedDigest[]) {
    return () => {
        const coincidences: HTMLInputElement[] =
        Array.from(document.querySelectorAll('.coincidences [type="checkbox"]'))
        const selected = coincidences.filter(coincidence => coincidence.checked)

        if (!selected.length) {
            document.querySelector('dialog#no-selected-coincidences')!.setAttribute('open', 'true')
            return
        }
        
        const playlist: string = generatePlaylistFrom(getSelectedCoincidences(comparedDigests, selected), downloadName)
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(playlist))
        element.setAttribute('download', filename)
        element.style.display = 'none'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }
}

function getSelectedCoincidences(comparedDigests: ComparedDigest[], selections: HTMLInputElement[]) {
    return selections
        .map(selection => {
            const playlistPosition = Number.parseInt(
                selection.getAttribute('data-playlist-position')!)
            const coincidencesPosition = Number.parseInt(
                selection.getAttribute('data-coincidences-position')!)

            return comparedDigests[playlistPosition].coincidences[coincidencesPosition]
        })
}