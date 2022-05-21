import {PlaylistParser} from './playlist-parser.js'

export class SpotifyParser extends PlaylistParser {
    extractTracks(spotifyPlaylist) {
        const regex = /(<div.*?type="track".*?>.*?<\/div>)/gsm
        return spotifyPlaylist.match(regex)
    }

    extractArtist(track) {
        const regex = /<a.*?href=".*?\/artist\/.*?">(.*?)<\/a>/s
        return track.match(regex)[1]
    }

    extractSong(track) {
        const regex = /<a.*?href=".*?\/track\/.*?">(.*?)<\/a>/s
        return track.match(regex)[1]
    }
}