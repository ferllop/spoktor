import * as assert from 'uvu/assert'
import {suite} from 'uvu'
import {parse} from '../../../../../src/js/spoktor/domain/parser/parser.js'
import {EmptyPlaylistError} from '../../../../../src/js/spoktor/domain/parser/errors/empty-playlist-error.js'

const parser = suite('Parser')

const dummyDataExtractor = {
    extractArtist() { return ''},
    extractSong() { return ''},
    extractTracks() { return []},
    extractLocation() { return ''},
    extractPlaylistName() { return ''},
}

parser('should throw error if spotify playlist is empty', () => {
    const emptyPlaylist = ''
    assert.throws(() => parse(dummyDataExtractor)(emptyPlaylist),
        (error: unknown) => error instanceof EmptyPlaylistError)
})

parser.run()
