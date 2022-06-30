import {PlaylistParser} from './playlist-parser'


function parse(/**string*/ playlist) {
    return PlaylistParser.parse(playlist, DataExtractor)
}

/** @type {import().DataExtractor } */
const DataExtractor = {
    extractTracks(rawPlaylist) {
        const regex = /(<div.*?type="track".*?>.*?<\/div>)/gsm
        return rawPlaylist.match(regex) ?? []
    },

    extractArtist(track) {
        const regex = /<a.*?href=".*?\/artist\/.*?">(.*?)<\/a>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractSong(track) {
        const regex = /<a.*?href=".*?\/track\/.*?">(.*?)<\/a>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractLocation() {
        return 'spotify'
    },

    extractPlaylistName(rawPlaylist) {
        const regex = /<meta property="og:title" content="(.*?)" \/>/
        return rawPlaylist.match(regex)?.[1] ?? ''
    },
}

/** @type {import().PlaylistParser }*/
export const SpotifyHtmlParser = {
    parse,
    ...DataExtractor,
}
