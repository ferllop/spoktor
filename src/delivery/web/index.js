import {Spoktor} from '../../domain/spoktor.js'

let spotifyPlaylist = null
let traktorPlaylist = null

const spotify = document.getElementById('spotify')
spotify.addEventListener('change', event => {
    loadSpotifyFile(event.target)
})

const traktor = document.getElementById('traktor')
traktor.addEventListener('change', event => {
    loadTraktorFile(event.target)
})

window.addEventListener('load', () => {
    if (spotify.value) {
        loadSpotifyFile(spotify)
    }
    if (traktor.value) {
        loadTraktorFile(traktor)
    }
})

function loadTraktorFile(inputElement) {
    const fr = new FileReader()
    fr.onload = function () {
        traktorPlaylist = fr.result
    }
    fr.readAsText(inputElement.files[0])
}

function loadSpotifyFile(inputElement) {
    const fr = new FileReader()
    fr.onload = function () {
        spotifyPlaylist = fr.result
        const aside = document.getElementById('spotify-content')
        aside.innerHTML = ''
        renderDigests(Spoktor.getDigestsFor(spotifyPlaylist), aside)
    }
    fr.readAsText(inputElement.files[0])
}

const submit = document.querySelector('input[type="submit"]')
submit.addEventListener('click', (event) => {
    event.preventDefault()
    const spoktor = new Spoktor(spotifyPlaylist, traktorPlaylist)
    const result = spoktor.getCoincidentDigests()
    document.dispatchEvent(new CustomEvent('spoktor', {bubbles: true, detail: result}))
})


const result = document.getElementById('result')
document.addEventListener('spoktor', event => {
    const digests = event.detail
    if (digests.length === 0) {
        return renderNoCoincidences(result)
    }
    result.innerHTML = ''
    const spoktor = new Spoktor(spotifyPlaylist, traktorPlaylist)
    insertDownloadButton(result, spoktor.getTraktorPlaylist(), spoktor.getPlaylistNameFrom(spotifyPlaylist))
    renderDigests(digests, result)
})

function renderNoCoincidences(parentElement) {
    parentElement.innerHTML = ''
    const article = document.createElement('article')
    article.innerText = 'There are no coincidences'
    parentElement.appendChild(article)
}
function insertDownloadButton(parent, fileContent, filename) {
    const button = document.createElement('button')
    button.innerText = 'Download traktor playlist'
    button.addEventListener('click', () => {
        download('spoktor_-' + filename + '.nml', fileContent)
    })
    parent.appendChild(button)
}

function renderDigests(digests, parentElement) {
    const list = document.createElement('ol')
    digests.map(digest => {
        const item = document.createElement('li')
        item.innerHTML = 'Artist: ' + digest.digest.artist +
            '<br />' + 'Song: ' + digest.digest.song
        list.appendChild(item)
    })
    parentElement.appendChild(list)
}

function download(filename, text) {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}


