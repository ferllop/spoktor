import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {SpotifyPlaylistBuilder} from '../../helpers/spotify-playlist-builder.js'
import {Spotify} from '../../../src/models/Spotify.js'

const spotify2Json = suite("Spotify to JSON converter")

spotify2Json.before.each(context => {
    context.spotify = new Spotify()
})

spotify2Json('should return an empty array when there are no tracks', ({spotify}) => {
    assert.equal(spotify.parse(''), [])
})

spotify2Json('should return a one item array when there is one track in the playlist', ({spotify}) => {
    const playlist = new SpotifyPlaylistBuilder().withXtracks(1).build()
    assert.equal(spotify.parse(playlist), [{index:0, artist:'artist1', song: 'song1'}])
})

spotify2Json('should return a the item array when there are two coincidences', ({spotify}) => {
    const playlist = new SpotifyPlaylistBuilder().withXtracks(2).build()
    assert.equal(spotify.parse(playlist), [{index:0, artist:'artist1', song: 'song1'}, {index: 1, artist:'artist2', song: 'song2'}])
})

spotify2Json.run()



