import {PlaylistParser, RawTrack} from './playlist-parser'
import {RawPlaylist} from '../models/raw-playlist'

export class TraktorXmlParser extends PlaylistParser {
    extractTracks(collection: RawPlaylist) {
        const regex = /(<ENTRY.*?>.*?<\/ENTRY>)/gsm
        return collection.match(regex) ?? []
    }

    extractArtist(track: RawTrack) {
        const regex = /<ENTRY.*?ARTIST="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    }

    extractSong(track: RawTrack) {
        /* We don't capture the title directly to be sure that we don't
           capture the TITLE existing into the album field */
        const entryRegex = /<ENTRY(.*?)>/s
        const entry = track.match(entryRegex)?.[1] ?? ''
        const titleRegex = /TITLE="(.*?)"/s
        return entry.match(titleRegex)?.[1] ?? ''
    }

    extractDir(track: RawTrack) {
        const regex = /<LOCATION.*?DIR="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    }

    extractFilename(track: RawTrack) {
        const regex = /<LOCATION.*?FILE="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    }

    extractVolume(track: RawTrack) {
        const regex = /<LOCATION.*?VOLUME="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    }

    extractPlaylistName() {
        return ''
    }
}
