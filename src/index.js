import * as fs from 'fs'
import {Spotify} from './Spotify.js'
import {Traktor} from './Traktor.js'

try {
    const spotifyPlaylistFile = process.argv[2]
    console.log(JSON.stringify(parseTracksSet(spotifyPlaylistFile, new Spotify())))

    const traktorCollectionFile = process.argv[3]
    console.log(JSON.stringify(parseTracksSet(traktorCollectionFile, new Traktor())))
} catch (error) {
    console.log(error.message)
}

function parseTracksSet(tracksSetFilename, parser) {
    let data = ''
    if (tracksSetFilename !== 'none') {
        data = fs.readFileSync(tracksSetFilename, 'utf8')
    }
    return parser.parse(data)
}