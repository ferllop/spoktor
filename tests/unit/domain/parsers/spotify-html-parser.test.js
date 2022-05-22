import {suite} from 'uvu'
import {SpotifyPlaylistBuilder} from '../../../helpers/builders/list/spotify-playlist-builder.js'
import {SpotifyHtmlParser} from '../../../../src/domain/parsers/spotify-html-parser.js'
import {assertDigestListsAreEqual} from '../../../helpers/custom-asserts.js'
import {DigestListBuilder} from '../../../helpers/builders/list/digest-list-builder.js'
import {SpotifyTrackBuilder} from '../../../helpers/builders/track/spotify-track-builder.js'

const spotifyHtmlParser = suite("Spotify HTML parser")

spotifyHtmlParser.before.each(context => {
    context.spotify = new SpotifyHtmlParser()
})

spotifyHtmlParser('should return a one item array when there is one track in the playlist', ({spotify}) => {
    const playlist = new SpotifyPlaylistBuilder().withXTracks(1).build()
    assertDigestListsAreEqual(
        spotify.parse(playlist),
        new DigestListBuilder().withXTracks(1, new SpotifyTrackBuilder()).build())
})

spotifyHtmlParser('should return a two items array when there are two items in the playlist', ({spotify}) => {
    const playlist = new SpotifyPlaylistBuilder().withXTracks(2)
    assertDigestListsAreEqual(spotify.parse(playlist.build()),
        new DigestListBuilder().withXTracks(2, new SpotifyTrackBuilder()).build())
})

spotifyHtmlParser.run()



