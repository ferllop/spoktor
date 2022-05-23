import {Spoktor} from './domain/spoktor.js'
import fs from 'fs'

const spotifyPlaylistFile = process.argv[2]
const traktorCollectionFile = process.argv[3]

function getFileContent(tracksSetFilename) {
    let data = ''
    if (tracksSetFilename !== 'none') {
        data = fs.readFileSync(tracksSetFilename, 'utf8')
    }
    return data
}

try {
    console.log(
        new Spoktor(
            getFileContent(spotifyPlaylistFile),
            getFileContent(traktorCollectionFile))
            .getTraktorPlaylist(),
    )
} catch (error) {
    console.log(error.message)
}