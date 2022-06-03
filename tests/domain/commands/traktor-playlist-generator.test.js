import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestListBuilder} from '../../helpers/builders/list/digest-list-builder'
import {TraktorPlaylistGenerator} from '../../../src/domain/commands/traktor-playlist-generator'
import {TraktorTrackBuilder} from '../../helpers/builders/track/traktor-track-builder'
import {TraktorPlaylistBuilder} from '../../helpers/builders/list/traktor-playlist-builder'

const traktorPlaylistGenerator = suite('Traktor playlist generator')

traktorPlaylistGenerator.before.each(context => {
    context.generator = new TraktorPlaylistGenerator()
})

traktorPlaylistGenerator('should generate a playlist with no entries when zero digests are provided', ({generator}) => {
    const digestPlaylist = []
    assert.equal(generator.execute(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withoutTracks().build())
})

traktorPlaylistGenerator('should generate a playlist with one entry when one digest is provided', ({generator}) => {
    const digestPlaylist = new DigestListBuilder().withXTracks(1, new TraktorTrackBuilder()).build()
    assert.equal(generator.execute(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withXTracks(1).build())
})

traktorPlaylistGenerator('should generate a playlist with two entries when two digests are provided', ({generator}) => {
    const digestPlaylist = new DigestListBuilder().withXTracks(2, new TraktorTrackBuilder()).build()
    assert.equal(generator.execute(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withXTracks(2).build())
})

traktorPlaylistGenerator.run()
