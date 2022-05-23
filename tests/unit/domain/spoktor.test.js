import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {Spoktor} from '../../../src/domain/spoktor.js'
import {TraktorPlaylistBuilder} from '../../helpers/builders/list/traktor-collection-builder.js'
import {SpotifyHtmlPlaylistBuilder} from '../../helpers/builders/list/spotify-html-playlist-builder.js'
import {EmptyPlaylistError} from '../../../src/domain/errors/empty-playlist-error.js'
import {assertRawDataAreEqual} from '../../helpers/custom-asserts.js'

const spoktorTest = suite('Spoktor')

const traktorCollection = new TraktorPlaylistBuilder().withXTracks(3).build()
const spotifyPlaylist = new SpotifyHtmlPlaylistBuilder().withXTracks(3).build()

spoktorTest('should throw error if spotify playlist is empty', () => {
    assert.throws(() => new Spoktor().execute([], traktorCollection),
            error => error instanceof EmptyPlaylistError)
})

spoktorTest('should throw error if traktor collection is empty', () => {
    assert.throws(() => new Spoktor().execute(spotifyPlaylist, []),
        error => error instanceof EmptyPlaylistError)
})

spoktorTest('should return the same traktor playlist if spotify and traktor are equal', () => {
    assertRawDataAreEqual(new Spoktor().execute(spotifyPlaylist, traktorCollection), traktorCollection)
})

spoktorTest('should return the one item that matches', () => {
    const spotifyPlaylist = new SpotifyHtmlPlaylistBuilder().withXTracks(1, 69).build()
    const traktorPlaylist = new TraktorPlaylistBuilder()
        .withXTracks(3)
        .withXTracks( 2, 69)
        .withXTracks(4, 3)
        .build()

    assertRawDataAreEqual(
        new Spoktor().execute(spotifyPlaylist, traktorPlaylist),
        new TraktorPlaylistBuilder().withXTracks(1, 69).build())
})



spoktorTest.run()