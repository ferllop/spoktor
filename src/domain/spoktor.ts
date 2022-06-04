import {TraktorPlaylist} from './commands/traktor-playlist-generator'
import {selectParserFor} from './commands/parser-selector'
import {DigestedPlaylist} from './models/digested-playlist'
import {RawPlaylist} from './models/raw-playlist'

export class Spoktor {

    constructor(private needles: RawPlaylist, private haystack: RawPlaylist) {
    }

    getTraktorPlaylist() {
        const playlistName = this.getPlaylistNameFrom(this.needles)
        const coincidentDigests = this.getCoincidentDigests()
        return TraktorPlaylist.generatePlaylistFrom(coincidentDigests, playlistName)
    }

    getCoincidentDigests() {
        const needles = RawPlaylist.digest(this.needles)
        const haystack = RawPlaylist.digest(this.haystack)
        return DigestedPlaylist.getNeedlesFromHaystack(needles, haystack)
    }

    getPlaylistNameFrom(playlist: RawPlaylist) {
        const parser = selectParserFor(playlist)
        return parser.extractPlaylistName(playlist)
    }
}
