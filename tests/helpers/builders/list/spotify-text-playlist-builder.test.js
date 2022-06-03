import {suite} from 'uvu'
import {readFileContent} from '../../read-file-content'
import {SpotifyTextPlaylistBuilder} from './spotify-text-playlist-builder'
import * as assert from 'uvu/assert'

const spotifyTextBuilder = suite('Spotify text playlist builder')

spotifyTextBuilder('should create the same playlist as a real one', () => {
    const real = readFileContent('./samples/spotify-text-sample.txt', import.meta)
    const generated = new SpotifyTextPlaylistBuilder().withXTracks(3).build()
    assert.equal(generated, real)
})

spotifyTextBuilder.run()
