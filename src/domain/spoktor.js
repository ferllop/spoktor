import {SpotifyHtmlParser} from './parsers/spotify-html-parser.js'
import {TraktorXmlParser} from './parsers/traktor-xml-parser.js'
import {Intersect} from './commands/intersect.js'
import {TraktorCollectionGenerator} from './commands/traktor-collection-generator.js'

export class Spoktor {
    execute(spotifyPlaylist, traktorCollection) {
        const spotifyDigests = new SpotifyHtmlParser().parse(spotifyPlaylist)
        const traktorDigests = new TraktorXmlParser().parse(traktorCollection)
        const coincidences = new Intersect().execute(spotifyDigests, traktorDigests)
        return new TraktorCollectionGenerator().execute(
            coincidences.map(coincidence => traktorDigests[coincidence]))
    }
}