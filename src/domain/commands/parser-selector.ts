import {SpotifyTextParser} from '../parsers/spotify-text-parser'
import {SpotifyHtmlParser} from '../parsers/spotify-html-parser'
import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {InvalidPlaylistError} from '../errors/invalid-playlist-error'
import {TraktorRawPlaylist} from './traktor-raw-playlist'

type RawPlaylist = string

export function selectParserFor(playlist: RawPlaylist) {
    if (playlist.length === 0) {
        throw new EmptyPlaylistError()
    }

    if (playlist.startsWith('<?xml') && playlist.includes('PROGRAM="Traktor"')) {
        return TraktorRawPlaylist.parser()
    }

    if (playlist.includes('Spotify<https://open.spotify.com/>')) {
        return new SpotifyTextParser()
    }

    if (playlist.startsWith('<!DOCTYPE html>') && playlist.includes('Spotify')) {
        return new SpotifyHtmlParser()
    }

    throw new InvalidPlaylistError()
}



