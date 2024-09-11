import * as assert from 'uvu/assert'
import {suite} from 'uvu'
import {parse, PlaylistParser} from '../../../../src/js/domain/parsers/playlist-parser.js'
import {EmptyPlaylistError} from '../../../../src/js/domain/errors/empty-playlist-error.js'

const playlistParserTest = suite('Playlist parser')

const dataExtractor = {
    extractArtist() { return ''},
    extractSong() { return ''},
    extractTracks() { return []},
    extractLocation() { return ''},
    extractPlaylistName() { return ''},
}
const TestablePlaylistParser: PlaylistParser = {
    parse: parse(dataExtractor),
    ...dataExtractor
}

playlistParserTest('should throw error if spotify playlist is empty is empty', () => {
    assert.throws(() => TestablePlaylistParser.parse(''),
        (error: unknown) => error instanceof EmptyPlaylistError)
})

playlistParserTest.run()
