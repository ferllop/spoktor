import {SpotifyTextParser} from './spotify-text-parser'
import {SpotifyHtmlParser} from './spotify-html-parser'
import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {InvalidPlaylistError} from '../errors/invalid-playlist-error'
import {TraktorXmlParser} from './traktor-xml-parser'
import {VirtualDjXmlParser} from './virtualdj-xml-parser'
import {ArtistTitleByLineParser} from './artist-title-by-line-text-parser'
import {TuneMyMusicCsvParser} from './tune-my-music-csv-parser'

/**
 * @type {import('./index').ParserSelector}
 */
export const selectParserFor = (rawPlaylist) => {
    if (rawPlaylist.length === 0) {
        throw new EmptyPlaylistError()
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('PROGRAM="Traktor"')) {
        return TraktorXmlParser
    }

    if (rawPlaylist.includes('Spotify<https://open.spotify.com/>')) {
        return SpotifyTextParser
    }

    if (rawPlaylist.startsWith('<!DOCTYPE html>') && rawPlaylist.includes('Spotify')) {
        return SpotifyHtmlParser
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('<VirtualDJ_Database')) {
        return VirtualDjXmlParser
    }

    if (rawPlaylist.includes('Name,Track Name')) {
        return ArtistTitleByLineParser
    }

    if (rawPlaylist.startsWith('Track name, Artist name, Album, Playlist name')) {
        return TuneMyMusicCsvParser
    }

    throw new InvalidPlaylistError()
}

