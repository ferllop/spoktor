import {TraktorXmlParser} from '../parsers/traktor-xml-parser.js'
import {SpotifyTextParser} from '../parsers/spotify-text-parser.js'
import {SpotifyHtmlParser} from '../parsers/spotify-html-parser.js'
import {EmptyPlaylistError} from '../errors/empty-playlist-error.js'
import {InvalidPlaylistError} from '../errors/invalid-playlist-error.js'

export class ParserSelector {
    selectFor(playlist) {
        if (playlist.length === 0) {
            throw new EmptyPlaylistError()
        }

        if (playlist.startsWith('<?xml') && playlist.includes('PROGRAM="Traktor"')) {
            return new TraktorXmlParser()
        }

        if (playlist.includes('Spotify<https://open.spotify.com/>')) {
            return new SpotifyTextParser()
        }

        if (playlist.startsWith('<!DOCTYPE html>') && playlist.includes('Spotify')) {
            return new SpotifyHtmlParser()
        }

        throw new InvalidPlaylistError()
    }
}