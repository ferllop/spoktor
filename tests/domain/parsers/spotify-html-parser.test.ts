import {suite} from 'uvu'
import {SpotifyHtmlPlaylistBuilder} from '../../helpers/builders/list/spotify-html-playlist-builder'
import {SpotifyHtmlParser} from '../../../src/domain/parsers/spotify-html-parser'
import {assertDigestedPlaylistsAreEqual} from '../../helpers/custom-asserts'
import {DigestPlaylistBuilder} from '../../helpers/builders/list/digest-playlist-builder'
import {SpotifyHtmlTrackBuilder} from '../../helpers/builders/track/spotify-html-track-builder'
import * as assert from 'uvu/assert'
import {PlaylistParser} from '../../../src/domain/parsers/playlist-parser'

type Context = { spotify: PlaylistParser }

const spotifyHtmlParser = suite<Context>("Spotify HTML parser")

spotifyHtmlParser.before.each(context => {
    context.spotify = new SpotifyHtmlParser()
})

spotifyHtmlParser('should return a one item array when there is one track in the playlist', ({spotify}) => {
    const playlist = new SpotifyHtmlPlaylistBuilder().withXTracks(1).build()
    assertDigestedPlaylistsAreEqual(
        spotify.parse(playlist),
        new DigestPlaylistBuilder().withXTracks(1, 1, new SpotifyHtmlTrackBuilder()).build())
})

spotifyHtmlParser('should return a two items array when there are two items in the playlist', ({spotify}) => {
    const playlist = new SpotifyHtmlPlaylistBuilder().withXTracks(2)
    assertDigestedPlaylistsAreEqual(spotify.parse(playlist.build()),
        new DigestPlaylistBuilder().withXTracks(2, 1, new SpotifyHtmlTrackBuilder()).build())
})

spotifyHtmlParser('should know how to extract the name of the playlist', ({spotify}) => {
    const playlistName = 'The Playlist'
    const playlist = new SpotifyHtmlPlaylistBuilder().withPlaylistName(playlistName).build()
    assert.equal(spotify.extractPlaylistName(playlist), playlistName)
})

spotifyHtmlParser.run()



