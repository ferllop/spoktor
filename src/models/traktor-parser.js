import {PlaylistParser} from './playlist-parser.js'

export class TraktorParser extends PlaylistParser {
    computeExtraData(track) {
        return {traktorData: track}
    }

    extractTracks(traktorCollection) {
        const regex = /(<ENTRY.*?>.*?<\/ENTRY>)/gsm
        return traktorCollection.match(regex)
    }

    extractArtist(track) {
        const regex = /<ENTRY.*?ARTIST="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    }

    extractSong(track) {
        const entryRegex = /<ENTRY(.*?)>/s
        const entry = track.match(entryRegex)[1]
        const titleRegex = /TITLE="(.*?)"/s
        return entry.match(titleRegex)?.[1] ?? ''
    }
}
