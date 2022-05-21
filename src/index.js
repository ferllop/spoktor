import {Spoktor} from './models/spoktor.js'
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

new Spoktor().execute(
    getFileContent(spotifyPlaylistFile),
    getFileContent(traktorCollectionFile))