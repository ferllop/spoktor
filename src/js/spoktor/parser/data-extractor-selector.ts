import {spotifyTextDataExtractor} from './data-extractors/spotify-text.js'
import {spotifyHtmlDataExtractor} from './data-extractors/spotify-html.js'
import {EmptyPlaylistError} from './errors/empty-playlist-error.js'
import {InvalidPlaylistError} from './errors/invalid-playlist-error.js'
import {traktorXmlDataExtractor} from './data-extractors/traktor-xml.js'
import {virtualdjXmlDataExtractor} from './data-extractors/virtualdj-xml.js'
import {byLineDataExtractor} from './data-extractors/artist-title-by-line-text.js'
import {tuneMyMusicCsvDataExtractor} from './data-extractors/tune-my-music-csv.js'
import {RawPlaylist} from './playlist-parser.js'

export const selectDataExtractor = (rawPlaylist: RawPlaylist) => {
    if (rawPlaylist.length === 0) {
        throw new EmptyPlaylistError()
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('PROGRAM="Traktor"')) {
        return traktorXmlDataExtractor
    }

    if (rawPlaylist.includes('Spotify<https://open.spotify.com/>')) {
        return spotifyTextDataExtractor
    }

    if (rawPlaylist.startsWith('<!DOCTYPE html>') && rawPlaylist.includes('Spotify')) {
        return spotifyHtmlDataExtractor
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('<VirtualDJ_Database')) {
        return virtualdjXmlDataExtractor
    }

    if (rawPlaylist.includes('Name,Track Name')) {
        return byLineDataExtractor
    }

    if (rawPlaylist.startsWith('Track name, Artist name, Album, Playlist name')) {
        return tuneMyMusicCsvDataExtractor
    }

    throw new InvalidPlaylistError()
}
