import {PlaylistParser} from './playlist-parser-class'

function parse(playlist: string) {
    return PlaylistParser.parse(playlist, DataExtractor)
}

const DataExtractor = {
    extractTracks(rawPlaylist: string) {
        const regex = /(<div.*?type="track".*?>.*?<\/div>)/gsm
        return rawPlaylist.match(regex) ?? []
    },

    extractArtist(track: string) {
        const regex = /<a.*?href=".*?\/artist\/.*?">(.*?)<\/a>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractSong(track: string) {
        const regex = /<a.*?href=".*?\/track\/.*?">(.*?)<\/a>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractLocation() {
        return 'spotify'
    },

    extractPlaylistName(rawPlaylist: string) {
        const regex = /<meta property="og:title" content="(.*?)" \/>/
        return rawPlaylist.match(regex)?.[1] ?? ''
    },
}

export const SpotifyHtmlParser: PlaylistParser = {
    parse,
    ...DataExtractor,
}
