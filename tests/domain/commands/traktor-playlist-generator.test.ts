import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestPlaylistBuilder} from '../../helpers/builders/list/digest-playlist-builder'
import {TraktorPlaylist} from '../../../src/domain/commands/traktor-playlist-generator'
import {TraktorTrackBuilder} from '../../helpers/builders/track/traktor-track-builder'
import {TraktorPlaylistBuilder} from '../../helpers/builders/list/traktor-playlist-builder'
import {DigestedPlaylist} from '../../../src/domain/models/digested-playlist'

const traktorPlaylistGenerator = suite('Traktor playlist generator')

traktorPlaylistGenerator('should generate a playlist with no entries when zero digests are provided', () => {
    const digestPlaylist = [] as DigestedPlaylist
    assert.equal(TraktorPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withoutTracks().build())
})

traktorPlaylistGenerator('should generate a playlist with one entry when one digest is provided', () => {
    const digestPlaylist = new DigestPlaylistBuilder().withXTracks(1, 1, new TraktorTrackBuilder()).build()
    assert.equal(TraktorPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withXTracks(1).build())
})

traktorPlaylistGenerator('should generate a playlist with two entries when two digests are provided', () => {
    const digestPlaylist = new DigestPlaylistBuilder().withXTracks(2, 1, new TraktorTrackBuilder()).build()
    assert.equal(TraktorPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        new TraktorPlaylistBuilder().withXTracks(2).build())
})

traktorPlaylistGenerator.run()
