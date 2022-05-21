import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {TraktorParser} from '../../../src/models/parsers/traktor-parser.js'
import {TraktorPlaylistBuilder} from '../../helpers/traktor-collection-builder.js'
import {TraktorTrackBuilder} from '../../helpers/traktor-track-builder.js'
import {DigestBuilder} from '../../helpers/digest-builder.js'
import {DigestListBuilder} from '../../helpers/digest-list-builder.js'
import {assertDigestListsAreEqual, assertRawDataAreEqual} from '../../helpers/custom-asserts.js'

const traktor2Json = suite('Traktor to JSON converter')

traktor2Json.before.each(context => {
    context.traktor = new TraktorParser()
})

traktor2Json('should return an empty array when there are no tracks', ({traktor}) => {
    assert.equal(traktor.parse(''), [])
})

traktor2Json('should return an empty title when there is no title', ({traktor}) => {
    const traktorTrack = new TraktorTrackBuilder().withArtist('artist1').withSong('')
    const playlist = new TraktorPlaylistBuilder().withTrack(traktorTrack.build()).build()
    assertDigestListsAreEqual(
        traktor.parse(playlist),
        new DigestListBuilder()
            .withDigest(DigestBuilder.fromBuildingTraktorTrack(traktorTrack)).build())
})

traktor2Json('should return an empty artist when artist is empty', ({traktor}) => {
    const track = new TraktorTrackBuilder().withArtist('').withSong('song1')
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    const digestsList = new DigestListBuilder().withDigest(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestListsAreEqual(traktor.parse(playlist), digestsList)
})

traktor2Json('should return an empty artist when there is no artist field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withSong('song1')
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    const digestsList = new DigestListBuilder().withDigest(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestListsAreEqual(traktor.parse(playlist), digestsList)
})

traktor2Json('should return an empty song when there is no title field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutSong().withArtist('artist1')
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    const digestsList = new DigestListBuilder().withDigest(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestListsAreEqual(traktor.parse(playlist), digestsList)
})

traktor2Json('should return a one item array when there is one track in the playlist', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(1)
    assertDigestListsAreEqual(
        traktor.parse(playlist.build()),
        new DigestListBuilder().withXTracks(1, new TraktorTrackBuilder()).build())
})

traktor2Json('should return a two items array when there are two coincidences', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(2)
    assertDigestListsAreEqual(
        traktor.parse(playlist.build()),
        new DigestListBuilder().withXTracks(2, new TraktorTrackBuilder()).build())
})

traktor2Json('should ignore a track if it has neither artist nor song', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withoutSong().build()
    const playlist = new TraktorPlaylistBuilder().withTrack(track).build()
    assertDigestListsAreEqual(traktor.parse(playlist),[])
})

traktor2Json('should include the raw data into the track digest', ({traktor}) => {
    const track = new TraktorTrackBuilder().build()
    const playlist = new TraktorPlaylistBuilder().withTrack(track).build()
    assertRawDataAreEqual(traktor.parse(playlist)[0].digest.rawData, track)
})

traktor2Json.run()
