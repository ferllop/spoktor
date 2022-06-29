import {SpotifyTextParser} from './spotify-text-parser'
import {SpotifyHtmlParser} from './spotify-html-parser-class'
import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {InvalidPlaylistError} from '../errors/invalid-playlist-error'
import {TraktorXmlParser} from './traktor-xml-parser'
import {VirtualDjXmlParser} from './virtualdj-xml-parser'
import {ArtistTitleByLineParser} from './artist-title-by-line-text-parser'
import {TuneMyMusicCsvParser} from './tune-my-music-csv-parser'
import {PlaylistParser} from './playlist-parser'

export function selectParserFor(rawPlaylist: string) {
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

const Parser: Record<string, PlaylistParser> = {
    'traktor-xml-parser': TraktorXmlParser,
    'spotify-text-parser': SpotifyTextParser,
    'spotify-html-parser': SpotifyHtmlParser,
    'virtual-dj-xml-parser': VirtualDjXmlParser,
    'artist-title-by-line-parser': ArtistTitleByLineParser,
    'tune-my-music-csv-parser': TuneMyMusicCsvParser
}

export function selectParserByType(type: string): PlaylistParser|void {
    if (type in Parser) {
        return Parser[type]
    }

    throw new InvalidPlaylistError()
}
