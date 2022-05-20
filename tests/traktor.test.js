import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {Traktor} from '../src/Traktor.js'
import {TraktorPlaylistBuilder} from './traktor-collection-builder.js'
import {TraktorTrackBuilder} from './traktor-track-builder.js'

const traktor2Json = suite('Traktor to JSON converter')

traktor2Json.before.each(context => {
    context.traktor = new Traktor()
})

traktor2Json('should return an empty array when there are no tracks', ({traktor}) => {
    assert.equal(traktor.parse(''), [])
})

traktor2Json('should return an empty title when there is no title', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withTrack(
        new TraktorTrackBuilder().withArtist('artist1').withSong('').build()
    ).build()
    assert.equal(traktor.parse(playlist), [{artist: 'artist1', song:''}])
})

traktor2Json('should return an empty artist when artist is empty', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withTrack(
        new TraktorTrackBuilder().withArtist('').withSong('song1').build()
    ).build()
    assert.equal(traktor.parse(playlist), [{artist: '', song:'song1'}])
})

traktor2Json('should return an empty artist when there is no artist field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withSong('song1').build()
    const playlist = new TraktorPlaylistBuilder().withTrack(track).build()
    assert.equal(traktor.parse(playlist), [{artist: '', song: 'song1'}])
})

traktor2Json('should return an empty song when there is no title field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutSong().withArtist('artist1').build()
    const playlist = new TraktorPlaylistBuilder().withTrack(track).build()
    assert.equal(traktor.parse(playlist), [{artist: 'artist1', song: ''}])
})

traktor2Json('should return a one item array when there is one track in the playlist', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(1).build()
    assert.equal(traktor.parse(playlist), [{artist: 'artist1', song: 'song1'}])
})

traktor2Json('should return a the item array when there are two coincidences', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(2).build()
    assert.equal(traktor.parse(playlist), [{artist: 'artist1', song: 'song1'}, {artist: 'artist2', song: 'song2'}])
})

traktor2Json('should ignore a track if it has neither artist nor song', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withoutSong().build()
    const playlist = new TraktorPlaylistBuilder().withTrack(track).build()
    assert.equal(traktor.parse(playlist), [])
})

traktor2Json.run()



