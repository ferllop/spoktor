import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {SpotifyPlaylistBuilder} from '../../helpers/spotify-playlist-builder.js'
import {SpotifyParser} from '../../../src/models/parsers/spotify-parser.js'
import {assertDigestListsAreEqual} from '../../helpers/custom-asserts.js'

const spotify2Json = suite("Spotify to JSON converter")

spotify2Json.before.each(context => {
    context.spotify = new SpotifyParser()
})

spotify2Json('should return an empty array when there are no tracks', ({spotify}) => {
    assert.equal(spotify.parse(''), [])
})

spotify2Json('should return a one item array when there is one track in the playlist', ({spotify}) => {
    const playlist = new SpotifyPlaylistBuilder().withXTracks(1)
    assertDigestListsAreEqual(spotify.parse(playlist.build()), playlist.toDigestList())
})

spotify2Json('should return a two items array when there are two items in the playlist', ({spotify}) => {
    const playlist = new SpotifyPlaylistBuilder().withXTracks(2)
    assertDigestListsAreEqual(spotify.parse(playlist.build()), playlist.toDigestList())
})

spotify2Json.run()



