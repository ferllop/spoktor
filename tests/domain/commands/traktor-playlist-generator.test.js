import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestListBuilder} from '../../helpers/builders/list/digest-list-builder'
import {TraktorPlaylist} from '../../../src/domain/commands/traktor-playlist-generator'
import {TraktorTrackBuilder} from '../../helpers/builders/track/traktor-track-builder'
import {TraktorPlaylistBuilder} from '../../helpers/builders/list/traktor-playlist-builder'

const traktorPlaylistGenerator = suite('Traktor playlist generator')

traktorPlaylistGenerator('should generate a playlist with no entries when zero digests are provided', () => {
    const digestPlaylist = []
    assert.equal(TraktorPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withoutTracks().build())
})

traktorPlaylistGenerator('should generate a playlist with one entry when one digest is provided', () => {
    const digestPlaylist = new DigestListBuilder().withXTracks(1, new TraktorTrackBuilder()).build()
    assert.equal(TraktorPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withXTracks(1).build())
})

traktorPlaylistGenerator('should generate a playlist with two entries when two digests are provided', () => {
    const digestPlaylist = new DigestListBuilder().withXTracks(2, new TraktorTrackBuilder()).build()
    assert.equal(TraktorPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withXTracks(2).build())
})

traktorPlaylistGenerator.run()
