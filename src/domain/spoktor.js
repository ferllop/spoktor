import {SpotifyParser} from './parsers/spotify-parser.js'
import {TraktorParser} from './parsers/traktor-parser.js'
import {Intersect} from './commands/intersect.js'
import {TraktorCollectionGenerator} from './commands/traktor-collection-generator.js'

export class Spoktor {
    execute(spotifyPlaylist, traktorCollection) {
        const spotifyDigests = new SpotifyParser().parse(spotifyPlaylist)
        const traktorDigests = new TraktorParser().parse(traktorCollection)
        const coincidences = new Intersect().execute(spotifyDigests, traktorDigests)
        return new TraktorCollectionGenerator().execute(
            coincidences.map(coincidence => traktorDigests[coincidence]))
    }
}