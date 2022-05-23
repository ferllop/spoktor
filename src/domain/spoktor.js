import {Intersect} from './commands/intersect.js'
import {TraktorCollectionGenerator} from './commands/traktor-collection-generator.js'
import {ParserSelector} from './commands/parser-selector.js'

export class Spoktor {
    execute(inputPlaylist, outputPlaylist) {
        const inputParser = new ParserSelector().selectFor(inputPlaylist)
        const inputDigests = inputParser.parse(inputPlaylist)

        const outputParser = new ParserSelector().selectFor(outputPlaylist)
        const outputDigests = outputParser.parse(outputPlaylist)

        const coincidences = new Intersect().execute(inputDigests, outputDigests)
        return new TraktorCollectionGenerator().execute(
            coincidences.map(coincidence => outputDigests[coincidence]))
    }
}