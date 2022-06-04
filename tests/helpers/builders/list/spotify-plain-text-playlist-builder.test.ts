import {suite} from 'uvu'
import {readFileContent} from '../../read-file-content'
import {SpotifyPlainTextPlaylistBuilder} from './spotify-plain-text-playlist-builder'
import * as assert from 'uvu/assert'

const spotifyPlainTextBuilder = suite('Spotify plain text playlist builder')

spotifyPlainTextBuilder('should create the same playlist as a real one', () => {
    const real = readFileContent('./samples/spotify-text-sample.txt', import.meta)
    const generated = new SpotifyPlainTextPlaylistBuilder().withXTracks(3).build()
    assert.equal(generated, real)
})

spotifyPlainTextBuilder.run()
