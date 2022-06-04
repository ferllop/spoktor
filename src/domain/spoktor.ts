import {DigestedPlaylist} from './models/digested-playlist'
import {RawPlaylist} from './models/raw-playlist'
import {TraktorRawPlaylist} from './models/traktor-raw-playlist'

export class Spoktor {

    constructor(private needles: RawPlaylist, private haystack: RawPlaylist) {
    }

    getTraktorPlaylist() {
        const playlistName = this.getPlaylistNameFrom(this.needles)
        const coincidentDigests = this.getCoincidentDigests()
        return TraktorRawPlaylist.generatePlaylistFrom(coincidentDigests, playlistName)
    }

    getCoincidentDigests() {
        const needles = RawPlaylist.digest(this.needles)
        const haystack = RawPlaylist.digest(this.haystack)
        return DigestedPlaylist.getNeedlesFromHaystack(needles, haystack)
    }

    getPlaylistNameFrom(playlist: RawPlaylist) {
        return RawPlaylist.extractPlaylistName(playlist)
    }
}
