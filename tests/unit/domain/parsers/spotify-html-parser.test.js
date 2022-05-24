import {suite} from 'uvu'
import {SpotifyHtmlPlaylistBuilder} from '../../../helpers/builders/list/spotify-html-playlist-builder.js'
import {SpotifyHtmlParser} from '../../../../src/domain/parsers/spotify-html-parser.js'
import {assertDigestListsAreEqual} from '../../../helpers/custom-asserts.js'
import {DigestListBuilder} from '../../../helpers/builders/list/digest-list-builder.js'
import {SpotifyHtmlTrackBuilder} from '../../../helpers/builders/track/spotify-html-track-builder.js'
import * as assert from 'uvu/assert'

const spotifyHtmlParser = suite("Spotify HTML parser")

spotifyHtmlParser.before.each(context => {
    context.spotify = new SpotifyHtmlParser()
})

spotifyHtmlParser('should return a one item array when there is one track in the playlist', ({spotify}) => {
    const playlist = new SpotifyHtmlPlaylistBuilder().withXTracks(1).build()
    assertDigestListsAreEqual(
        spotify.parse(playlist),
        new DigestListBuilder().withXTracks(1, new SpotifyHtmlTrackBuilder()).build())
})

spotifyHtmlParser('should return a two items array when there are two items in the playlist', ({spotify}) => {
    const playlist = new SpotifyHtmlPlaylistBuilder().withXTracks(2)
    assertDigestListsAreEqual(spotify.parse(playlist.build()),
        new DigestListBuilder().withXTracks(2, new SpotifyHtmlTrackBuilder()).build())
})

spotifyHtmlParser('should know how to extract the name of the playlist', ({spotify}) => {
    const playlistName = 'The Playlist'
    const playlist = new SpotifyHtmlPlaylistBuilder().withPlaylistName(playlistName).build()
    assert.equal(spotify.extractPlaylistName(playlist), playlistName)
})

spotifyHtmlParser.run()



