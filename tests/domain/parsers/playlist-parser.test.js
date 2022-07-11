import * as assert from 'uvu/assert'
import {suite} from 'uvu'
import {PlaylistParser} from '../../../src/js/domain/parsers/playlist-parser.js'
import {EmptyPlaylistError} from '../../../src/js/domain/errors/empty-playlist-error.js'

const playlistParserTest = suite('Playlist parser')

const dataExtractor = {
    extractArtist() { return ''},
    extractSong() { return ''},
    extractTracks() { return []},
    extractLocation() { return ''},
    extractPlaylistName() { return ''},
}
const TestablePlaylistParser = {
    parse: playlist => PlaylistParser.parse(playlist, dataExtractor),
    ...dataExtractor
}

playlistParserTest('should throw error if spotify playlist is empty is empty', () => {
    assert.throws(() => TestablePlaylistParser.parse(''),
        error => error instanceof EmptyPlaylistError)
})

playlistParserTest.run()
