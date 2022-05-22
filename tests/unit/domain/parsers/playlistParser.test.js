import * as assert from 'uvu/assert'
import {EmptyPlaylistError} from '../../../../src/domain/errors/empty-playlist-error.js'
import {suite} from 'uvu'
import {PlaylistParser} from '../../../../src/domain/parsers/playlist-parser.js'

const playlistParserTest = suite('Playlist parser')

const TestablePlaylistParser = class extends PlaylistParser {
    extractArtist(track) { }
    extractSong(track) { }
    extractTracks(playlist) { }
}

playlistParserTest('should throw error if spotify playlist is empty is empty', () => {
    assert.throws(() => new TestablePlaylistParser().parse(''),
        error => error instanceof EmptyPlaylistError)
})

playlistParserTest.run()