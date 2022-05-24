import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {Spoktor} from '../../../src/domain/spoktor.js'
import {TraktorCollectionBuilder} from '../../helpers/builders/list/traktor-collection-builder.js'
import {SpotifyHtmlPlaylistBuilder} from '../../helpers/builders/list/spotify-html-playlist-builder.js'
import {EmptyPlaylistError} from '../../../src/domain/errors/empty-playlist-error.js'
import {assertDigestListsAreEqual} from '../../helpers/custom-asserts.js'
import * as crypto from 'node:crypto'

const spoktorTest = suite('Spoktor')

const traktorCollection = new TraktorCollectionBuilder().withXTracks(3).build()
const spotifyPlaylist = new SpotifyHtmlPlaylistBuilder().withXTracks(3).build()

spoktorTest('should throw error if spotify playlist is empty', () => {
    assert.throws(() => new Spoktor([], traktorCollection).getTraktorPlaylist(crypto.randomUUID),
            error => error instanceof EmptyPlaylistError)
})

spoktorTest('should throw error if traktor collection is empty', () => {
    assert.throws(() => new Spoktor(spotifyPlaylist, []).getTraktorPlaylist(crypto.randomUUID),
        error => error instanceof EmptyPlaylistError)
})

spoktorTest('should return the same traktor playlist if spotify and traktor are equal', () => {
    assertDigestListsAreEqual(
        Spoktor.getDigestsFor(
            new Spoktor(spotifyPlaylist, traktorCollection)
                .getTraktorPlaylist(crypto.randomUUID)),
        Spoktor.getDigestsFor(traktorCollection))
})

spoktorTest('should return the one item that matches', () => {
    const spotifyPlaylist = new SpotifyHtmlPlaylistBuilder().withXTracks(1, 69).build()
    const traktorPlaylist = new TraktorCollectionBuilder()
        .withXTracks(3)
        .withXTracks( 2, 69)
        .withXTracks(4, 3)
        .build()

    assertDigestListsAreEqual(
        Spoktor.getDigestsFor(
            new Spoktor(spotifyPlaylist, traktorPlaylist)
                .getTraktorPlaylist(crypto.randomUUID)),
        Spoktor.getDigestsFor(
            new TraktorCollectionBuilder().withXTracks(1, 69).build()))
})

spoktorTest.run()
