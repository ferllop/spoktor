import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {
    toSpotifyPlainTextPlaylist,
} from '../../../../helpers/builders/list/spotify-plain-text-playlist-builder.js'
import {assertDigestedPlaylistsAreEqual} from '../../../../helpers/custom-asserts.js'
import {aPlaylist, withPlaylistName, withXTracks } from '../../../../helpers/builders/list/playlist-builder.js'
import {toSpotifyTextTrack} from '../../../../helpers/builders/track/spotify-text-track-builder.js'
import {aTrack, withPosition, withArtist, withArtists, withSong} from '../../../../helpers/builders/track/track-builder.js'
import {toDigestsPlaylist} from '../../../../helpers/builders/list/digest-playlist-builder.js'
import { pipe } from '../../../../../../src/js/lib/fp.js'
import { spotifyTextDataExtractor } from '../../../../../../src/js/spoktor/domain/parser/data-extractors/spotify-text.js'
import { parse } from '../../../../../../src/js/spoktor/domain/parser/parser.js'

const spotifyTextParser = suite("Spotify Text parser")

spotifyTextParser('should return a one item array when there is one track in the playlist', () => {
    const playlist = pipe(aPlaylist, withXTracks(1))
    assertDigestedPlaylistsAreEqual(
        parse(spotifyTextDataExtractor)(toSpotifyPlainTextPlaylist(playlist)),
        toDigestsPlaylist(toSpotifyTextTrack)(playlist))
})

spotifyTextParser('should know how to extract a track', () => {
    const fullSample = toSpotifyPlainTextPlaylist(withXTracks(3)(aPlaylist))
    const expected = toSpotifyTextTrack(withPosition(1)(aTrack))
    assert.equal(spotifyTextDataExtractor.extractTracks(fullSample)[0], expected)
})

spotifyTextParser('should know how to extract the song title from track', () => {
    const track = toSpotifyTextTrack(withSong('The Song')(aTrack))
    const result = spotifyTextDataExtractor.extractSong(track)
    assert.equal(result, 'The Song')
})

spotifyTextParser('should know how to extract the artist from track when there is a single artist', () => {
    const track = toSpotifyTextTrack(withArtist('The Artist')(aTrack))
    const result = spotifyTextDataExtractor.extractArtist(track)
    assert.equal(result, 'The Artist')
})

spotifyTextParser('should know how to extract the artist from track when there are three artists', () => {
    const track = toSpotifyTextTrack(
        withArtists([
            'This is the first artist',
            'This is the second artist',
            'This is the third artist'
        ])(aTrack)
    )
    const result = spotifyTextDataExtractor.extractArtist(track)
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
    const result = spotifyTextDataExtractor.extractArtist(track)
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
    const result = spotifyTextDataExtractor.extractArtist(track)
    assert.equal(result, 'Artist 1')
})

spotifyTextParser('should return the two digests when there are two items in the playlist', () => {
    const playlist = withXTracks(2)(aPlaylist)
    assertDigestedPlaylistsAreEqual(
        parse(spotifyTextDataExtractor)(toSpotifyPlainTextPlaylist(playlist)),
        toDigestsPlaylist(toSpotifyTextTrack)(playlist))
})

spotifyTextParser('should know how to extract the playlist name', () => {
    const playlistName = 'The Playlist'
    const playlist = withPlaylistName(playlistName)(aPlaylist)
    assert.equal(spotifyTextDataExtractor.extractPlaylistName(toSpotifyPlainTextPlaylist(playlist)), playlistName)
})

spotifyTextParser.run()
