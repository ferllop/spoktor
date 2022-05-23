import {Intersect} from './commands/intersect.js'
import {TraktorCollectionGenerator} from './commands/traktor-collection-generator.js'
import {ParserSelector} from './commands/parser-selector.js'

export class Spoktor {

    constructor(inputPlaylist, outputPlaylist) {
        this.input = this.getDigestsFor(inputPlaylist)
        this.output = this.getDigestsFor(outputPlaylist)
    }

    getTraktorPlaylist() {
        const coincidenceIndexes = this.getCoincidentDigests()
        return new TraktorCollectionGenerator().execute(coincidenceIndexes)
    }

    getCoincidentDigests() {
        return new Intersect().execute(this.input, this.output)
            .map(coincidence => this.output[coincidence])
    }

    getDigestsFor(playlist) {
        const parser = new ParserSelector().selectFor(playlist)
        return parser.parse(playlist)
    }
}