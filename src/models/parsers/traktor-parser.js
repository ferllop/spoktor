import {PlaylistParser} from './playlist-parser.js'

export class TraktorParser extends PlaylistParser {
    extractTracks(collection) {
        const regex = /(<ENTRY.*?>.*?<\/ENTRY>)/gsm
        return collection.match(regex)
    }

    extractArtist(track) {
        const regex = /<ENTRY.*?ARTIST="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    }

    extractSong(track) {
        /* We don't capture the title directly to be sure that we don't
           capture the TITLE existing into the album field */
        const entryRegex = /<ENTRY(.*?)>/s
        const entry = track.match(entryRegex)[1]
        const titleRegex = /TITLE="(.*?)"/s
        return entry.match(titleRegex)?.[1] ?? ''
    }
}