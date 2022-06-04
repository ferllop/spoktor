import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {Spoktor} from '../../src/domain/spoktor'
import {TraktorCollectionBuilder} from '../helpers/builders/list/traktor-collection-builder'
import {SpotifyHtmlPlaylistBuilder} from '../helpers/builders/list/spotify-html-playlist-builder'
import {EmptyPlaylistError} from '../../src/domain/errors/empty-playlist-error'
import {assertDigestedPlaylistsAreEqual} from '../helpers/custom-asserts'
import {SpotifyPlainTextPlaylistBuilder} from '../helpers/builders/list/spotify-plain-text-playlist-builder'
import {RawPlaylist} from '../../src/domain/models/raw-playlist'

const spoktorTest = suite('Spoktor')

const traktorCollection = new TraktorCollectionBuilder().withXTracks(3).build()
const spotifyPlaylist = new SpotifyPlainTextPlaylistBuilder().withXTracks(3).build()

spoktorTest('should throw error if spotify playlist is empty', () => {
    assert.throws(() => new Spoktor('', traktorCollection).getTraktorPlaylist(),
        (error: Error) => error instanceof EmptyPlaylistError)
})

spoktorTest('should throw error if traktor collection is empty', () => {
    assert.throws(() => new Spoktor(spotifyPlaylist, '').getTraktorPlaylist(),
        (error: Error) => error instanceof EmptyPlaylistError)
})

spoktorTest('should return the same traktor playlist if spotify and traktor are equal', () => {
    assertDigestedPlaylistsAreEqual(
        RawPlaylist.digest(new Spoktor(spotifyPlaylist, traktorCollection).getTraktorPlaylist()),
        RawPlaylist.digest(traktorCollection))
})

spoktorTest('should return the one item that matches', () => {
    const spotifyPlaylist = new SpotifyHtmlPlaylistBuilder().withXTracks(1, 69).build()
    const traktorPlaylist = new TraktorCollectionBuilder()
        .withXTracks(3)
        .withXTracks( 2, 69)
        .withXTracks(4, 3)
        .build()

    assertDigestedPlaylistsAreEqual(
        RawPlaylist.digest(new Spoktor(spotifyPlaylist, traktorPlaylist).getTraktorPlaylist()),
        RawPlaylist.digest(new TraktorCollectionBuilder().withXTracks(1, 69).build()))
})

spoktorTest.run()
