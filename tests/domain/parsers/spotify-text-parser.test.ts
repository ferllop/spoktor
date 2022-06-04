import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {SpotifyTextParser} from '../../../src/domain/parsers/spotify-text-parser'
import {SpotifyTextTrackBuilder} from '../../helpers/builders/track/spotify-text-track-builder'
import {SpotifyPlainTextPlaylistBuilder} from '../../helpers/builders/list/spotify-plain-text-playlist-builder'
import {assertDigestedPlaylistsAreEqual} from '../../helpers/custom-asserts'
import {DigestPlaylistBuilder} from '../../helpers/builders/list/digest-playlist-builder'
import {PlaylistParser} from '../../../src/domain/parsers/playlist-parser'

type Context = { spotify: PlaylistParser }
const spotifyTextParser = suite<Context>("Spotify Text parser")

spotifyTextParser.before.each(context => {
    context.spotify = new SpotifyTextParser()
})

spotifyTextParser('should return a one item array when there is one track in the playlist', ({spotify}) => {
    const playlist = new SpotifyPlainTextPlaylistBuilder().withXTracks(1).build()
    assertDigestedPlaylistsAreEqual(
        spotify.parse(playlist),
        new DigestPlaylistBuilder().withXTracks(1, 1, new SpotifyTextTrackBuilder()).build())
})

spotifyTextParser('should know how to extract a track', ({spotify}) => {
    const fullSample = new SpotifyPlainTextPlaylistBuilder().withXTracks(3).build()
    const expected = new SpotifyTextTrackBuilder().numberedWith(1).build()
    assert.equal(spotify.extractTracks(fullSample)[0], expected)
})

spotifyTextParser('should know how to extract the song title from track', ({spotify}) => {
    const track = new SpotifyTextTrackBuilder().withSong('The Song').build()
    const result = spotify.extractSong(track)
    assert.equal(result, 'The Song')
})

spotifyTextParser('should know how to extract the artist from track when there is a single artist', ({spotify}) => {
    const track = new SpotifyTextTrackBuilder().withArtist('The Artist').build()
    const result = spotify.extractArtist(track)
    assert.equal(result, 'The Artist')
})

spotifyTextParser('should know how to extract the artist from track when there are three artists', ({spotify}) => {
    const track = new SpotifyTextTrackBuilder()
        .withArtists(
            'This is the first artist',
            'This is the second artist',
            'This is the third artist'
        ).build()
    const result = spotify.extractArtist(track)
    assert.equal(result, 'This is the first artist, This is the second artist, This is the third artist')
})

spotifyTextParser('should know how to extract the artist from track when there are three artists with word-break in its names', ({spotify}) => {
    const track = `2

Summer Sippin'
Artist 1 <https://open.spotify.com/artist/08p782h5VznNEQMM4wAEp9>, Artist
2 <https://open.spotify.com/artist/08p782h5VznNEQMM4wAEp9>, Artist 3
<https://open.spotify.com/artist/04Z34FmSj3cdFipHz013Id>
Summer Sippin' <https://open.spotify.com/album/5BT52U1Dee7ed2FIQbFkb9>
hace 25 días

3:21`
    const result = spotify.extractArtist(track)
    assert.equal(result, 'Artist 1, Artist 2, Artist 3')
})

spotifyTextParser('should not include the album when its breaked in two lines', ({spotify}) => {
    const track = `2

Summer Sippin'
Artist 1 <https://open.spotify.com/artist/08p782h5VznNEQMM4wAEp9>
Summer Sippin'
<https://open.spotify.com/album/5BT52U1Dee7ed2FIQbFkb9>
hace 25 días

3:21`
    const result = spotify.extractArtist(track)
    assert.equal(result, 'Artist 1')
})

spotifyTextParser('should return the two digests when there are two items in the playlist', ({spotify}) => {
    const playlist = new SpotifyPlainTextPlaylistBuilder().withXTracks(2).build()
    assertDigestedPlaylistsAreEqual(
        spotify.parse(playlist),
        new DigestPlaylistBuilder().withXTracks(2, 1, new SpotifyTextTrackBuilder()).build())
})

spotifyTextParser('should know how to extract the playlist name', ({spotify}) => {
    const playlistName = 'The Playlist'
    const playlist = new SpotifyPlainTextPlaylistBuilder().withPlaylistName(playlistName).build()
    assert.equal(spotify.extractPlaylistName(playlist), playlistName)
})



spotifyTextParser.run()

