import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {TraktorParser} from '../../../src/models/traktor-parser.js'
import {TraktorPlaylistBuilder} from '../../helpers/traktor-collection-builder.js'
import {TraktorTrackBuilder} from '../../helpers/traktor-track-builder.js'
import {TrackDigestBuilder} from '../../helpers/track-digest-builder.js'
import {DigestPlaylistBuilder} from '../../helpers/digest-playlist-builder.js'
import {assertDigestPlaylistsAreEqual, assertDigestsAreEqual} from '../../helpers/custom-asserts.js'

const traktor2Json = suite('Traktor to JSON converter')

traktor2Json.before.each(context => {
    context.traktor = new TraktorParser()
})

traktor2Json('should return an empty array when there are no tracks', ({traktor}) => {
    assert.equal(traktor.parse(''), [])
})

traktor2Json('should return an empty title when there is no title', ({traktor}) => {
    const track = new TraktorTrackBuilder().withArtist('artist1').withSong('')
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    assertDigestPlaylistsAreEqual(
        traktor.parse(playlist),
        [TrackDigestBuilder.fromBuildingTraktorTrack(track)])
})

traktor2Json('should return an empty artist when artist is empty', ({traktor}) => {
    const track = new TraktorTrackBuilder().withArtist('').withSong('song1')
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    assertDigestPlaylistsAreEqual(
        traktor.parse(playlist),
        [TrackDigestBuilder.fromBuildingTraktorTrack(track)])
})

traktor2Json('should return an empty artist when there is no artist field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withSong('song1')
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    assertDigestPlaylistsAreEqual(
        traktor.parse(playlist),
        [TrackDigestBuilder.fromBuildingTraktorTrack(track)])
})

traktor2Json('should return an empty song when there is no title field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutSong().withArtist('artist1')
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    assertDigestPlaylistsAreEqual(
        traktor.parse(playlist),
        [TrackDigestBuilder.fromBuildingTraktorTrack(track)])
})

traktor2Json('should return a one item array when there is one track in the playlist', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(1)
    assertDigestPlaylistsAreEqual(
        traktor.parse(playlist.build()),
        new DigestPlaylistBuilder().withTracksQuantity(1).build())
})

traktor2Json('should return a two items array when there are two coincidences', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(2)
    assertDigestPlaylistsAreEqual(
        traktor.parse(playlist.build()),
        new DigestPlaylistBuilder().withTracksQuantity(2).build())
})

traktor2Json('should ignore a track if it has neither artist nor song', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withoutSong().build()
    const playlist = new TraktorPlaylistBuilder().withTrack(track).build()
    assertDigestPlaylistsAreEqual(traktor.parse(playlist),[])
})

traktor2Json('should include the traktor entry data into the track digest', ({traktor}) => {
    const track = new TraktorTrackBuilder()
    const playlist = new TraktorPlaylistBuilder().withTrack(track.build()).build()
    assertDigestsAreEqual(
        traktor.parse(playlist)[0],
        TrackDigestBuilder.fromBuildingTraktorTrack(track))
})

traktor2Json.run()
