import * as fs from 'fs'
import {Spotify} from './models/Spotify.js'
import {Traktor} from './models/Traktor.js'
import {Intersect} from './models/Intersect.js'
import {TraktorCollectionGenerator} from './models/traktor-collection-generator.js'

try {
    const spotifyPlaylistFile = process.argv[2]
    const traktorCollectionFile = process.argv[3]

    const spotifyDigests = parseTracksSet(spotifyPlaylistFile, new Spotify())
    const traktorDigests = parseTracksSet(traktorCollectionFile, new Traktor())

    const coincidences = new Intersect().execute(spotifyDigests, traktorDigests)

    console.log(new TraktorCollectionGenerator().execute(
        coincidences.map(coincidence => traktorDigests[coincidence])))
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