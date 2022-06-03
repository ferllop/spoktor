import {intersectPlaylists} from './commands/intersectPlaylists'
import {TraktorPlaylistGenerator} from './commands/traktor-playlist-generator'
import {selectParserFor} from './commands/parser-selector'

export class Spoktor {

    constructor(inputPlaylist, outputPlaylist) {
        this.input = inputPlaylist
        this.output = outputPlaylist
    }

    getTraktorPlaylist() {
        const playlistName = this.getPlaylistNameFrom(this.input)
        const coincidentDigests = this.getCoincidentDigests()
        return new TraktorPlaylistGenerator().execute(coincidentDigests, playlistName)
    }

    getCoincidentDigests() {
        const inputDigests = Spoktor.getDigestsFor(this.input)
        const outputDigests = Spoktor.getDigestsFor(this.output)
        return intersectPlaylists(inputDigests, outputDigests)
            .map(coincidentDigest => outputDigests[coincidentDigest])
    }

    static getDigestsFor(playlist) {
        const parser = selectParserFor(playlist)
        return parser.parse(playlist)
    }

    getPlaylistNameFrom(playlist) {
        const parser = selectParserFor(playlist)
        return parser.extractPlaylistName(playlist)
    }
}
