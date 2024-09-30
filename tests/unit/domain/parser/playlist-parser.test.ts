import * as assert from 'uvu/assert'
import {suite} from 'uvu'
import {parse} from '../../../../src/js/domain/parser/playlist-parser.js'
import {EmptyPlaylistError} from '../../../../src/js/domain/errors/empty-playlist-error.js'

const playlistParserTest = suite('Playlist parser')

const dataExtractor = {
    extractArtist() { return ''},
    extractSong() { return ''},
    extractTracks() { return []},
    extractLocation() { return ''},
    extractPlaylistName() { return ''},
}
const TestablePlaylistParser = parse(dataExtractor)

playlistParserTest('should throw error if spotify playlist is empty', () => {
    assert.throws(() => TestablePlaylistParser(''),
        (error: unknown) => error instanceof EmptyPlaylistError)
})

playlistParserTest.run()
