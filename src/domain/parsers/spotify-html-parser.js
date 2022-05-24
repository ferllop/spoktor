import {PlaylistParser} from './playlist-parser.js'

export class SpotifyHtmlParser extends PlaylistParser {
    extractTracks(playlist) {
        const regex = /(<div.*?type="track".*?>.*?<\/div>)/gsm
        return playlist.match(regex)
    }

    extractArtist(track) {
        const regex = /<a.*?href=".*?\/artist\/.*?">(.*?)<\/a>/s
        return track.match(regex)[1]
    }

    extractSong(track) {
        const regex = /<a.*?href=".*?\/track\/.*?">(.*?)<\/a>/s
        return track.match(regex)[1]
    }

    extractPlaylistName(playlist) {
        const regex = /<meta property="og:title" content="(.*?)" \/>/
        return playlist.match(regex)[1]
    }
}