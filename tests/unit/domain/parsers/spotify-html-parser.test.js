import {suite} from 'uvu'
import {SpotifyHtmlParser} from '../../../../src/js/domain/parsers/spotify-html-parser.js'
import * as assert from 'uvu/assert'
import {buildSpotifyHtmlPlaylist, withXTracks as withXHtmlTracks} from '../../helpers/builders/list/spotify-html-playlist-builder.js'
import {aPlaylist, withPlaylistName} from '../../helpers/builders/list/playlist-builder.js'

const spotifyHtmlParser = suite("Spotify HTML parser")

spotifyHtmlParser('should return a one item array when there is one track in the playlist', () => {
    const playlist = buildSpotifyHtmlPlaylist(withXHtmlTracks(1, 1, aPlaylist))
    assert.equal(SpotifyHtmlParser.parse(playlist).length,1)
})

spotifyHtmlParser('should return a two items array when there are two items in the playlist', () => {
    const playlist = buildSpotifyHtmlPlaylist(withXHtmlTracks(2, 1, aPlaylist))
    assert.equal(SpotifyHtmlParser.parse(playlist).length, 2)
})

spotifyHtmlParser('should know how to extract the name of the playlist', () => {
    const playlistName = 'The Playlist'
    const playlist = buildSpotifyHtmlPlaylist(withPlaylistName(playlistName, aPlaylist))
    assert.equal(SpotifyHtmlParser.extractPlaylistName(playlist), playlistName)
})

spotifyHtmlParser.run()
