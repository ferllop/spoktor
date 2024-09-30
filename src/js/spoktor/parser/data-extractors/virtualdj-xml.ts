import {DataExtractor} from '../playlist-parser.js'

export const virtualdjXmlDataExtractor: DataExtractor = {
    extractTracks(collection) {
        const regex = /(<Song.*?>.*?<\/Song>)/gsm
        return collection.match(regex) ?? []
    },

    extractArtist(track) {
        const regex = /<Song.*?Author="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractSong(track) {
        const regex = /<Song.*?Title="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractLocation(track) {
        const regex = /FilePath="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractPlaylistName() {
        return ''
    },
}
