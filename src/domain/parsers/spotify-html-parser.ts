import {PlaylistParser} from './playlist-parser'
import {RawPlaylist} from '../models/raw-playlist'

export class SpotifyHtmlParser extends PlaylistParser {
    extractTracks(playlist: RawPlaylist) {
        const regex = /(<div.*?type="track".*?>.*?<\/div>)/gsm
        return playlist.match(regex) ?? []
    }

    extractArtist(track: string) {
        const regex = /<a.*?href=".*?\/artist\/.*?">(.*?)<\/a>/s
        return track.match(regex)?.[1] ?? ''
    }

    extractSong(track: string) {
        const regex = /<a.*?href=".*?\/track\/.*?">(.*?)<\/a>/s
        return track.match(regex)?.[1] ?? ''
    }

    extractPlaylistName(playlist: RawPlaylist) {
        const regex = /<meta property="og:title" content="(.*?)" \/>/
        return playlist.match(regex)?.[1] ?? ''
    }
}
