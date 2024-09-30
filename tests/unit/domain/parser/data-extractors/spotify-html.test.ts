import {suite} from 'uvu'
import {spotifyHtmlDataExtractor} from '../../../../../src/js/spoktor/parser/data-extractors/spotify-html.js'
import * as assert from 'uvu/assert'
import {toSpotifyHtmlPlaylist} from '../../../helpers/builders/list/spotify-html-playlist-builder.js'
import {aPlaylist, withPlaylistName, withXTracks} from '../../../helpers/builders/list/playlist-builder.js'
import { pipe } from '../../../../../src/js/lib/fp.js'
import { parse } from '../../../../../src/js/spoktor/parser/parser.js'

const spotifyHtmlParser = suite("Spotify HTML parser")

spotifyHtmlParser('should return a one item array when there is one track in the playlist', () => {
    const playlist = toSpotifyHtmlPlaylist(pipe(aPlaylist, withXTracks(1)))
    assert.equal(parse(spotifyHtmlDataExtractor)(playlist).length, 1)
})

spotifyHtmlParser('should return a two items array when there are two items in the playlist', () => {
    const playlist = toSpotifyHtmlPlaylist(pipe(aPlaylist, withXTracks(2)))
    assert.equal(parse(spotifyHtmlDataExtractor)(playlist).length, 2)
})

spotifyHtmlParser('should know how to extract the name of the playlist', () => {
    const playlistName = 'The Playlist'
    const playlist = toSpotifyHtmlPlaylist(withPlaylistName(playlistName)(aPlaylist))
    assert.equal(spotifyHtmlDataExtractor.extractPlaylistName(playlist), playlistName)
})

spotifyHtmlParser.run()
