import {suite} from 'uvu'
import {readFileContent} from '../../read-file-content.js'
import * as assert from 'uvu/assert'
import {buildSpotifyPlainTextPlaylist, withXTracks} from './spotify-plain-text-playlist-builder.js'
import {aPlaylist} from './playlist-builder.js'

const spotifyPlainTextBuilder = suite('Spotify plain text playlist builder')

spotifyPlainTextBuilder('should create the same playlist as a real one', () => {
    const real = readFileContent('./samples/spotify-text-sample.txt', import.meta)
    const generated = buildSpotifyPlainTextPlaylist(withXTracks(3, 1, aPlaylist))
    assert.equal(generated, real)
})

spotifyPlainTextBuilder.run()
