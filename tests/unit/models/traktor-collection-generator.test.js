import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestListBuilder} from '../../helpers/digest-list-builder.js'
import {TraktorCollectionGenerator} from '../../../src/models/traktor-collection-generator.js'
import {TraktorPlaylistBuilder} from '../../helpers/traktor-collection-builder.js'
import {TraktorTrackBuilder} from '../../helpers/traktor-track-builder.js'

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
    const digestPlaylist = new DigestListBuilder().withXTracks(1, new TraktorTrackBuilder()).build()
    assert.equal(generator.execute(digestPlaylist),
        new TraktorPlaylistBuilder().withXtracks(1).build())
})

traktorGenerator('should generate a collection with two entries when two digests are provided', ({generator}) => {
    const digestPlaylist = new DigestListBuilder().withXTracks(2, new TraktorTrackBuilder()).build()
    assert.equal(generator.execute(digestPlaylist),
        new TraktorPlaylistBuilder().withXtracks(2).build())
})

traktorGenerator.run()