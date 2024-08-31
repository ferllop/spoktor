import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {TraktorRawPlaylist} from '../../../../src/js/domain/models/traktor-raw-playlist.js'
import {aPlaylist, withoutTracks} from '../../helpers/builders/list/playlist-builder.js'
import {buildTraktorPlaylist} from '../../helpers/builders/list/traktor-playlist-builder.js'
import {withXTracks} from '../../helpers/builders/list/digest-playlist-builder.js'
import {pipe, prop} from 'ramda'
import { Digest } from '../../../../src/js/domain/models/digest.js'

const traktorPlaylistGenerator = suite('Traktor playlist generator')

traktorPlaylistGenerator('should generate a playlist with no entries when zero digests are provided', () => {
    const digestPlaylist: Digest[] = []
    assert.equal(TraktorRawPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        pipe(withoutTracks, buildTraktorPlaylist)(aPlaylist))
})

traktorPlaylistGenerator('should generate a playlist with one entry when one digest is provided', () => {
    const digestPlaylist = pipe(withXTracks, prop('tracks'))(1,1, aPlaylist)
    assert.equal(TraktorRawPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        pipe(withXTracks, buildTraktorPlaylist)(1,1, aPlaylist))
})

function log(value: string) {
    console.log('LOG:', value)
    return value
}

traktorPlaylistGenerator('should generate a playlist with two entries when two digests are provided', () => {
    const digestPlaylist = pipe(withXTracks, prop('tracks'))(2, 1, aPlaylist)
    assert.equal(TraktorRawPlaylist.generatePlaylistFrom(digestPlaylist, 'the-playlist-name'),
        pipe(withXTracks, buildTraktorPlaylist)(2, 1, aPlaylist))
})

traktorPlaylistGenerator.run()
