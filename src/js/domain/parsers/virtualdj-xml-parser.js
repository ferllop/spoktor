import {PlaylistParser} from './playlist-parser.js'

/** @type {import('./index').PlaylistParser['parse']} */
const parse = playlist => PlaylistParser.parse(playlist, dataExtractor)

/** @type {import().DataExtractor} */
const dataExtractor = {
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

/** @type {import('index').PlaylistParser } */
export const VirtualDjXmlParser = {
    parse,
    ...dataExtractor,
}
