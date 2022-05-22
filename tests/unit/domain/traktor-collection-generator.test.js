import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestListBuilder} from '../../helpers/builders/list/digest-list-builder.js'
import {TraktorCollectionGenerator} from '../../../src/domain/traktor-collection-generator.js'
import {TraktorPlaylistBuilder} from '../../helpers/builders/list/traktor-collection-builder.js'
import {TraktorTrackBuilder} from '../../helpers/builders/track/traktor-track-builder.js'

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
        new TraktorPlaylistBuilder().withXTracks(1).build())
})

traktorGenerator('should generate a collection with two entries when two digests are provided', ({generator}) => {
    const digestPlaylist = new DigestListBuilder().withXTracks(2, new TraktorTrackBuilder()).build()
    assert.equal(generator.execute(digestPlaylist),
        new TraktorPlaylistBuilder().withXTracks(2).build())
})

traktorGenerator.run()