import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {SpotifyTextPlaylistBuilder} from '../../helpers/builders/list/spotify-text-playlist-builder'
import {SpotifyTextParser} from '../../../src/domain/parsers/spotify-text-parser'
import {ParserSelector} from '../../../src/domain/commands/parser-selector'
import {TraktorXmlParser} from '../../../src/domain/parsers/traktor-xml-parser'
import {TraktorCollectionBuilder} from '../../helpers/builders/list/traktor-collection-builder'
import {EmptyPlaylistError} from '../../../src/domain/errors/empty-playlist-error'
import {SpotifyHtmlPlaylistBuilder} from '../../helpers/builders/list/spotify-html-playlist-builder'
import {SpotifyHtmlParser} from '../../../src/domain/parsers/spotify-html-parser'

const parserSelector = suite('Parser selector')

parserSelector('should return the parser to parse a traktor text playlist when is what is provided', () => {
    const traktorPlaylist = new TraktorCollectionBuilder().withXTracks(3).build()
    assert.instance(new ParserSelector().selectFor(traktorPlaylist), TraktorXmlParser)
})

parserSelector('should return the parser to parse a text spotify playlist when is what is provided', () => {
    const spotifyTextPlaylist = new SpotifyTextPlaylistBuilder().withXTracks(3).build()
    assert.instance(new ParserSelector().selectFor(spotifyTextPlaylist), SpotifyTextParser)
})

parserSelector('should return the parser to parse a html spotify playlist when is what is provided', () => {
    const spotifyHtmlPlaylist = new SpotifyHtmlPlaylistBuilder().withXTracks(3).build()
    assert.instance(new ParserSelector().selectFor(spotifyHtmlPlaylist), SpotifyHtmlParser)
})

parserSelector('should throw EmptyPlaylistError when playlist is empty', () => {
    const emptyPlaylist = ''
    assert.throws(() => new ParserSelector().selectFor(emptyPlaylist),
        error => error instanceof EmptyPlaylistError)
})

parserSelector.run()
