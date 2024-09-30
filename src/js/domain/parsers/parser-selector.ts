import {spotifyTextDataExtractor} from './spotify-text-parser.js'
import {spotifyHtmlDataExtractor} from './spotify-html-parser.js'
import {EmptyPlaylistError} from '../errors/empty-playlist-error.js'
import {InvalidPlaylistError} from '../errors/invalid-playlist-error.js'
import {traktorXmlDataExtractor} from './traktor-xml-parser.js'
import {virtualdjXmlDataExtractor} from './virtualdj-xml-parser.js'
import {byLineDataExtractor} from './artist-title-by-line-text-parser.js'
import {tuneMyMusicCsvDataExtractor} from './tune-my-music-csv-parser.js'
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
