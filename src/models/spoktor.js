import {SpotifyParser} from './spotify-parser.js'
import {TraktorParser} from './traktor-parser.js'
import {Intersect} from './intersect.js'
import {TraktorCollectionGenerator} from './traktor-collection-generator.js'

export class Spoktor {
    execute(spotifyPlaylist, traktorCollection) {
        try {
            const spotifyDigests = new SpotifyParser().parse(spotifyPlaylist)
            const traktorDigests = new TraktorParser().parse(traktorCollection)
            const coincidences = new Intersect().execute(spotifyDigests, traktorDigests)
            console.log(new TraktorCollectionGenerator().execute(
                coincidences.map(coincidence => traktorDigests[coincidence])))
        } catch (error) {
            console.log(error.message)
        }
    }
}