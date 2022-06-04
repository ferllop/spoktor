import {SpotifyTextParser} from './spotify-text-parser'
import {SpotifyHtmlParser} from './spotify-html-parser'
import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {InvalidPlaylistError} from '../errors/invalid-playlist-error'
import {TraktorRawPlaylist} from '../models/traktor-raw-playlist'

export function selectParserFor(rawPlaylist: string) {
    if (rawPlaylist.length === 0) {
        throw new EmptyPlaylistError()
    }

    if (rawPlaylist.startsWith('<?xml') && rawPlaylist.includes('PROGRAM="Traktor"')) {
        return TraktorRawPlaylist.getParser()
    }

    if (rawPlaylist.includes('Spotify<https://open.spotify.com/>')) {
        return new SpotifyTextParser()
    }

    if (rawPlaylist.startsWith('<!DOCTYPE html>') && rawPlaylist.includes('Spotify')) {
        return new SpotifyHtmlParser()
    }

    throw new InvalidPlaylistError()
}
