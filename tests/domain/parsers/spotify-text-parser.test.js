import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {SpotifyTextParser} from '../../../src/js/domain/parsers/spotify-text-parser.js'
import {
    buildSpotifyPlainTextPlaylist,
    withXTracks as withXTextTracks,
} from '../../helpers/builders/list/spotify-plain-text-playlist-builder.js'
import {assertDigestedPlaylistsAreEqual} from '../../helpers/custom-asserts.js'
import {aPlaylist, withPlaylistName, withXTracks} from '../../helpers/builders/list/playlist-builder.js'
import {buildSpotifyTextTrack} from '../../helpers/builders/track/spotify-text-track-builder.js'
import {aTrack, numberedWith, withArtist, withArtists, withSong} from '../../helpers/builders/track/track-builder.js'
import {buildDigestsPlaylist} from '../../helpers/builders/list/digest-playlist-builder.js'
import {aDigest, withRawData} from '../../helpers/builders/track/digest-builder.js'

const spotifyTextParser = suite("Spotify Text parser")
/** @typedef {import('../../helpers/builders/track/index').Track} Track */
/** @typedef {import('../../helpers/builders/list/index').Playlist} Playlist */

const transformer = (/** Track */ track) => {
    const spotifyTrack = buildSpotifyTextTrack(track)
    const digest = aDigest(track)
    return withRawData(spotifyTrack, digest)
}

spotifyTextParser('should return a one item array when there is one track in the playlist', () => {
    const playlist = buildSpotifyPlainTextPlaylist(withXTextTracks(1, 0, aPlaylist))
    assertDigestedPlaylistsAreEqual(
        SpotifyTextParser.parse(playlist),
        buildDigestsPlaylist(
            withXTracks(1, 0,
            transformer,
            aPlaylist)))
})

spotifyTextParser('should know how to extract a track', () => {
    const fullSample = buildSpotifyPlainTextPlaylist(withXTextTracks(3, 1, aPlaylist))
    const expected = buildSpotifyTextTrack(numberedWith(1, aPlaylist))
    assert.equal(SpotifyTextParser.extractTracks(fullSample)[0], expected)
})

spotifyTextParser('should know how to extract the song title from track', () => {
    const track = buildSpotifyTextTrack(withSong('The Song', aTrack))
    const result = SpotifyTextParser.extractSong(track)
    assert.equal(result, 'The Song')
})

spotifyTextParser('should know how to extract the artist from track when there is a single artist', () => {
    const track = buildSpotifyTextTrack(withArtist('The Artist', aTrack))
    const result = SpotifyTextParser.extractArtist(track)
    assert.equal(result, 'The Artist')
})

spotifyTextParser('should know how to extract the artist from track when there are three artists', () => {
    const track = buildSpotifyTextTrack(
        withArtists(
            ['This is the first artist',
            'This is the second artist',
            'This is the third artist'],
            aTrack
        ))
    const result = SpotifyTextParser.extractArtist(track)
    assert.equal(result, 'This is the first artist, This is the second artist, This is the third artist')
})

spotifyTextParser('should know how to extract the artist from track when there are three artists with word-break in its names', () => {
    const track = `2

Summer Sippin'
Artist 1 <https://open.spotify.com/artist/08p782h5VznNEQMM4wAEp9>, Artist
2 <https://open.spotify.com/artist/08p782h5VznNEQMM4wAEp9>, Artist 3
<https://open.spotify.com/artist/04Z34FmSj3cdFipHz013Id>
Summer Sippin' <https://open.spotify.com/album/5BT52U1Dee7ed2FIQbFkb9>
hace 25 días

3:21`
    const result = SpotifyTextParser.extractArtist(track)
    assert.equal(result, 'Artist 1, Artist 2, Artist 3')
})

spotifyTextParser('should not include the album when its breaked in two lines', () => {
    const track = `2

Summer Sippin'
Artist 1 <https://open.spotify.com/artist/08p782h5VznNEQMM4wAEp9>
Summer Sippin'
<https://open.spotify.com/album/5BT52U1Dee7ed2FIQbFkb9>
hace 25 días

3:21`
    const result = SpotifyTextParser.extractArtist(track)
    assert.equal(result, 'Artist 1')
})

spotifyTextParser('should return the two digests when there are two items in the playlist', () => {
    const playlist = buildSpotifyPlainTextPlaylist(withXTextTracks(2, 1, aPlaylist))
    assertDigestedPlaylistsAreEqual(
        SpotifyTextParser.parse(playlist),
        buildDigestsPlaylist(
            withXTracks(2, 1, transformer, aPlaylist)))
})

spotifyTextParser('should know how to extract the playlist name', () => {
    const playlistName = 'The Playlist'
    const playlist = buildSpotifyPlainTextPlaylist(withPlaylistName(playlistName, aPlaylist))
    assert.equal(SpotifyTextParser.extractPlaylistName(playlist), playlistName)
})

spotifyTextParser.run()
