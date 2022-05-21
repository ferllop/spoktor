import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestPlaylistBuilder} from './digest-playlist-builder.js'
import {TraktorCollectionGenerator} from '../src/traktor-collection-generator.js'
import {TraktorPlaylistBuilder} from './traktor-collection-builder.js'

const traktorGenerator = suite('Traktor generator')

traktorGenerator.before.each(context => {
    context.generator = new TraktorCollectionGenerator()
})

traktorGenerator('should generate a collection with no entries when zero digests are provided', ({generator}) => {
    const digestPlaylist = []
    assert.equal(generator.execute(digestPlaylist),
        new TraktorPlaylistBuilder().withoutTracks().build())
})

traktorGenerator('should generate a collection with one entry when one digest is provided', ({generator}) => {
    const digestPlaylist = new DigestPlaylistBuilder().withTracksQuantity(1).build()
    assert.equal(generator.execute(digestPlaylist),
        new TraktorPlaylistBuilder().withXtracks(1).build())
})

traktorGenerator('should generate a collection with two entries when two digests are provided', ({generator}) => {
    const digestPlaylist = new DigestPlaylistBuilder().withTracksQuantity(2).build()
    assert.equal(generator.execute(digestPlaylist),
        new TraktorPlaylistBuilder().withXtracks(2).build())
})

traktorGenerator.run()