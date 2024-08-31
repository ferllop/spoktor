import {SpotifyTextParser} from './spotify-text-parser.js'
import {SpotifyHtmlParser} from './spotify-html-parser.js'
import {EmptyPlaylistError} from '../errors/empty-playlist-error.js'
import {InvalidPlaylistError} from '../errors/invalid-playlist-error.js'
import {TraktorXmlParser} from './traktor-xml-parser.js'
import {VirtualDjXmlParser} from './virtualdj-xml-parser.js'
import {ArtistTitleByLineParser} from './artist-title-by-line-text-parser.js'
import {TuneMyMusicCsvParser} from './tune-my-music-csv-parser.js'
import { PlaylistParser, RawPlaylist } from './playlist-parser.js'

export type ParserSelector = (rawPlaylist: RawPlaylist) => PlaylistParser

export const selectParserFor = (rawPlaylist: RawPlaylist) => {
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
