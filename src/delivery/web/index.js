import {Spoktor} from '../../models/spoktor.js'

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
    }
    fr.readAsText(inputElement.files[0])
}

const submit = document.querySelector('input[type="submit"]')
submit.addEventListener('click', (event) => {
    event.preventDefault()
    getResults()
})

function getResults() {
    const result = new Spoktor().execute(spotifyPlaylist, traktorPlaylist)
    download('generated-playlist.nml', result)
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

