import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {EmptyPlaylistError} from '../../../../src/js/domain/errors/empty-playlist-error.js'
import {selectParserFor} from '../../../../src/js/domain/parsers/parser-selector.js'
import {TuneMyMusicCsvParser} from '../../../../src/js/domain/parsers/tune-my-music-csv-parser.js'
import {TraktorXmlParser} from '../../../../src/js/domain/parsers/traktor-xml-parser.js'
import {SpotifyTextParser} from '../../../../src/js/domain/parsers/spotify-text-parser.js'
import {SpotifyHtmlParser} from '../../../../src/js/domain/parsers/spotify-html-parser.js'
import {buildTraktorCollection, withXTracks} from '../../helpers/builders/list/traktor-collection-builder.js'
import {aPlaylist} from '../../helpers/builders/list/playlist-builder.js'
import {buildSpotifyPlainTextPlaylist} from '../../helpers/builders/list/spotify-plain-text-playlist-builder.js'
import {buildSpotifyHtmlPlaylist} from '../../helpers/builders/list/spotify-html-playlist-builder.js'

const parserSelector = suite('Parser selector')

parserSelector('should return the parser to parse a traktor text playlist when is what is provided', () => {
    const traktorPlaylist = buildTraktorCollection(withXTracks(3, 0, aPlaylist))
    assert.equal(selectParserFor(traktorPlaylist), TraktorXmlParser)
})

parserSelector('should return the parser to parse a text spotify playlist when is what is provided', () => {
    const spotifyTextPlaylist = buildSpotifyPlainTextPlaylist(withXTracks(3, 0, aPlaylist))
    assert.equal(selectParserFor(spotifyTextPlaylist), SpotifyTextParser)
})

parserSelector('should return the parser to parse a html spotify playlist when is what is provided', () => {
    const spotifyHtmlPlaylist = buildSpotifyHtmlPlaylist(withXTracks(3, 0, aPlaylist))
    assert.equal(selectParserFor(spotifyHtmlPlaylist), SpotifyHtmlParser)
})

parserSelector('should return the parser to parse a html spotify playlist when is what is provided', () => {
    const csvPlaylist = 'Track name, Artist name, Album, Playlist name'
    assert.equal(selectParserFor(csvPlaylist), TuneMyMusicCsvParser)
})

parserSelector('should throw EmptyPlaylistError when playlist is empty', () => {
    const emptyPlaylist = ''
    assert.throws(() => {
            selectParserFor(emptyPlaylist)},
        (error) => error instanceof EmptyPlaylistError)
})

parserSelector.run()
