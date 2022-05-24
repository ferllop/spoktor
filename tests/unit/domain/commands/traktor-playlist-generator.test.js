import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestListBuilder} from '../../../helpers/builders/list/digest-list-builder.js'
import {TraktorPlaylistGenerator} from '../../../../src/domain/commands/traktor-playlist-generator.js'
import {TraktorTrackBuilder} from '../../../helpers/builders/track/traktor-track-builder.js'
import {TraktorPlaylistBuilder} from '../../../helpers/builders/list/traktor-playlist-builder.js'
import * as crypto from 'node:crypto'

const traktorPlaylistGenerator = suite('Traktor playlist generator')

traktorPlaylistGenerator.before.each(context => {
    context.generator = new TraktorPlaylistGenerator(crypto.randomUUID)
})

traktorPlaylistGenerator('should generate a playlist with no entries when zero digests are provided', ({generator}) => {
    const digestPlaylist = []
    assert.equal(removeUUID(generator.execute(digestPlaylist, 'the-playlist-name')),
        removeUUID(new TraktorPlaylistBuilder().withoutTracks().build()))
})

traktorPlaylistGenerator('should generate a playlist with one entry when one digest is provided', ({generator}) => {
    const digestPlaylist = new DigestListBuilder().withXTracks(1, new TraktorTrackBuilder()).build()
    assert.equal(removeUUID(generator.execute(digestPlaylist, 'the-playlist-name')),
        removeUUID(new TraktorPlaylistBuilder().withXTracks(1).build()))
})

traktorPlaylistGenerator('should generate a playlist with two entries when two digests are provided', ({generator}) => {
    const digestPlaylist = new DigestListBuilder().withXTracks(2, new TraktorTrackBuilder()).build()
    assert.equal(removeUUID(generator.execute(digestPlaylist, 'the-playlist-name')),
        removeUUID(new TraktorPlaylistBuilder().withXTracks(2).build()))
})

function removeUUID(track) {
    return track.replace(/UUID="(.*?)"/, '')
}

traktorPlaylistGenerator.run()