import {parse} from 'node-html-parser'
import * as fs from 'fs'
import {Spotify} from './Spotify.js'
import {Traktor} from './Traktor.js'

const spotify = new Spotify({parse})
const traktor = new Traktor()

try {
    const spotifyPlaylistFile = process.argv[2]
    console.log(parseSpotifyPlaylist(spotifyPlaylistFile))

    const traktorCollectionFile = process.argv[3]
    console.log(JSON.stringify(parseTraktorCollection(traktorCollectionFile)))
} catch (error) {
    console.log(error.message)
}

function parseSpotifyPlaylist(playlistFilename) {
    let htmlString = ''
    if (playlistFilename !== 'none') {
        htmlString = fs.readFileSync(playlistFilename, 'utf8')
    }
    return spotify.parse(htmlString)
}

function parseTraktorCollection(collectionFilename) {
    let xmlString = ''
    if (collectionFilename !== 'none') {
        xmlString = fs.readFileSync(collectionFilename, 'utf8')
    }
    return traktor.parse(xmlString)
}