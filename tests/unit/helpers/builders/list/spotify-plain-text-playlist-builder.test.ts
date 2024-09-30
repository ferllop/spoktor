import {suite} from 'uvu'
import {readFileContent} from '../../read-file-content.js'
import * as assert from 'uvu/assert'
import {toSpotifyPlainTextPlaylist} from './spotify-plain-text-playlist-builder.js'
import {aPlaylist, withXTracks} from './playlist-builder.js'
import { pipe } from '../../../../../src/js/lib/fp.js'

const spotifyPlainTextBuilder = suite('Spotify plain text playlist builder')

spotifyPlainTextBuilder('should create the same playlist as a real one', () => {
    const real = readFileContent('./samples/spotify-text-sample.txt', import.meta)
    const playlist = pipe(aPlaylist, withXTracks(3))
    const generated = toSpotifyPlainTextPlaylist(playlist)
    assert.equal(generated, real)
})

spotifyPlainTextBuilder.run()
