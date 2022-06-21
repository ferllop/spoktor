import * as assert from 'uvu/assert'
import {EmptyPlaylistError} from '../../../src/domain/errors/empty-playlist-error'
import {suite} from 'uvu'
import {PlaylistParser} from '../../../src/domain/parsers/playlist-parser-class'

const playlistParserTest = suite('Playlist parser')

const dataExtractor = {
    extractArtist() { return ''},
    extractSong() { return ''},
    extractTracks() { return []},
    extractLocation() { return ''},
    extractPlaylistName() { return ''},
}
const TestablePlaylistParser: PlaylistParser = {
    parse: (playlist: string ) => PlaylistParser.parse(playlist, dataExtractor),
    ...dataExtractor
}

playlistParserTest('should throw error if spotify playlist is empty is empty', () => {
    assert.throws(() => TestablePlaylistParser.parse(''),
        (error: Error) => error instanceof EmptyPlaylistError)
})

playlistParserTest.run()
