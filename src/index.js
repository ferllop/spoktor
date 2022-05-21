import * as fs from 'fs'
import {SpotifyParser} from './models/spotify-parser.js'
import {TraktorParser} from './models/traktor-parser.js'
import {Intersect} from './models/intersect.js'
import {TraktorCollectionGenerator} from './models/traktor-collection-generator.js'

try {
    const spotifyPlaylistFile = process.argv[2]
    const traktorCollectionFile = process.argv[3]

    const spotifyDigests = parseTracksSet(spotifyPlaylistFile, new SpotifyParser())
    const traktorDigests = parseTracksSet(traktorCollectionFile, new TraktorParser())

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