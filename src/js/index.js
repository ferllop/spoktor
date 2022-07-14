import {selectParserFor} from './domain/parsers/parser-selector'
import {DigestedPlaylist} from './domain/models/digested-playlist.js'
import {M3UOutputPlaylist} from './domain/models/m3u-output-playlist.js'
import {RawPlaylist} from './domain/models/raw-playlist.js'

let needles
let haystack
let downloadName
let result

const needlesInput = document.getElementById('needles')
const haystackInput = document.getElementById('haystack')

window.addEventListener('load', handleInitialLoad)
needlesInput.addEventListener('change', event => handleNeedleChange(event.target))
haystackInput.addEventListener('change', event => handleHaystackChange(event.target))

async function handleNeedleChange(inputElement) {
    const fileContent = await loadFileContent(inputElement)
    const parser = await selectParserFor(fileContent)
    needles = parser.parse(fileContent)
    downloadName = RawPlaylist.extractPlaylistName(fileContent)
    makeResult()
}

async function handleHaystackChange(inputElement) {
    const fileContent = await loadFileContent(inputElement)
    const parser = await selectParserFor(fileContent)
    haystack = parser.parse(fileContent)
    makeResult()
}

function handleInitialLoad() {
    if (needlesInput.value) {
        handleNeedleChange(needlesInput)
    }
    if (handleHaystackChange.value) {
        handleHaystackChange(haystackInput)
    }
}

function loadFileContent(inputElement) /** Promise<string> */ {
    return new Promise((resolve, reject) => {
        if (!inputElement.files?.[0]) {
            return reject()
        }
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            return resolve(fr.result)
        })
        fr.readAsText(inputElement.files[0])
    })
}

function templateWithContent(/** string */ content) {
    const template = document.createElement('template')
    template.innerHTML = content
    return template
}

function getDigestsToRender() {
    if (needles !== undefined && haystack !== undefined) {
        return DigestedPlaylist.intersect(needles, haystack)
    }

    if (needles !== undefined) {
        return needles
    }

    return []
}

function makeResult() {
    const list = document.createElement('ol')
    result = getDigestsToRender()
    result.forEach((/** AugmentedDigest */ digest, /** number */ indexA) => {
        const item = document.createElement('li')

        item.appendChild(templateWithContent(
            `Artist: ${digest.artist}<br />Song: ${digest.song}`).content)
        if (digest.coincidences?.length > 0 ) {
            item.appendChild(makeCoincidences(digest, indexA))
        }
        list.appendChild(item)
    })
    renderResult(list)
}

function makeCoincidences(/** AugmentedDigest */ digest, /** number */ indexA) {
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

function renderResult(/** HTMLOListElement */ result) {
    const resultEl = document.querySelector('.result')
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
    button.addEventListener('click', handleDownload)
    return button
}

function handleDownload() {
    download(
        `spoktor_-${downloadName}.m3u`,
        M3UOutputPlaylist.generatePlaylistFrom(getSelectedCoincidences(), downloadName))
}

function download(/** string */ filename, /** string */ text) {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

function getSelectedCoincidences() {
    const selections = document.querySelectorAll('.result input[type="checkbox"]')
    return Array.from(selections)
        .filter((selection) => selection.checked)
        .map(selection => {
            const playlistPosition = Number.parseInt(selection.getAttribute('data-playlist-position'))
            const coincidencesPosition = Number.parseInt(selection.getAttribute('data-coincidences-position'))
            return result[playlistPosition].coincidences[coincidencesPosition]
        })
}
