import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {SpotifyPlainTextPlaylistBuilder} from '../../helpers/builders/list/spotify-plain-text-playlist-builder'
import {SpotifyTextParser} from '../../../src/domain/parsers/spotify-text-parser'
import {TraktorXmlParser} from '../../../src/domain/parsers/traktor-xml-parser'
import {TraktorCollectionBuilder} from '../../helpers/builders/list/traktor-collection-builder'
import {EmptyPlaylistError} from '../../../src/domain/errors/empty-playlist-error'
import {SpotifyHtmlPlaylistBuilder} from '../../helpers/builders/list/spotify-html-playlist-builder'
import {SpotifyHtmlParser} from '../../../src/domain/parsers/spotify-html-parser-class'
import {selectParserFor} from '../../../src/domain/parsers/parser-selector'

const parserSelector = suite('Parser selector')

parserSelector('should return the parser to parse a traktor text playlist when is what is provided', () => {
    const traktorPlaylist = new TraktorCollectionBuilder().withXTracks(3).build()
    assert.equal(selectParserFor(traktorPlaylist), TraktorXmlParser)
})

parserSelector('should return the parser to parse a text spotify playlist when is what is provided', () => {
    const spotifyTextPlaylist = new SpotifyPlainTextPlaylistBuilder().withXTracks(3).build()
    assert.equal(selectParserFor(spotifyTextPlaylist), SpotifyTextParser)
})

parserSelector('should return the parser to parse a html spotify playlist when is what is provided', () => {
    const spotifyHtmlPlaylist = new SpotifyHtmlPlaylistBuilder().withXTracks(3).build()
    assert.equal(selectParserFor(spotifyHtmlPlaylist), SpotifyHtmlParser)
})

parserSelector('should throw EmptyPlaylistError when playlist is empty', () => {
    const emptyPlaylist = ''
    assert.throws(() => {
            selectParserFor(emptyPlaylist)},
        (error: Error) => error instanceof EmptyPlaylistError)
})

parserSelector.run()
