import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {aPlaylist, mapTracks, withoutTracks, withXTracks} from '../../../../helpers/builders/list/playlist-builder.js'
import {toTraktorPlaylist} from '../../../../helpers/builders/list/traktor-playlist-builder.js'
import { generatePlaylistFrom } from '../../../../../../src/js/spoktor/domain/playlist-generators/generators/traktor-raw-playlist.js'
import { toTraktorEntry, toTraktorTrack } from '../../../../helpers/builders/track/traktor-track-builder.js'
import { pipe } from '../../../../../../src/js/lib/fp.js'
import { Digest } from '../../../../../../src/js/spoktor/domain/digest.js'
import { toDigest } from '../../../../helpers/builders/track/digest-builder.js'

const traktorPlaylistGenerator = suite('Traktor playlist generator')

traktorPlaylistGenerator('should generate a playlist with no entries when zero digests are provided', () => {
    const playlist: Digest[] = []
    assert.equal(generatePlaylistFrom('the-playlist-name')(playlist),
        pipe(aPlaylist, withoutTracks, mapTracks(toTraktorTrack), toTraktorPlaylist))
})

traktorPlaylistGenerator('should generate a playlist with one entry when one track is provided', () => {
    const playlist = pipe(aPlaylist, withXTracks(1))
    const traktorPlaylist = pipe(playlist, mapTracks(toDigest(track => pipe(track, toTraktorTrack, toTraktorEntry))))
    assert.equal(generatePlaylistFrom('the-playlist-name')(traktorPlaylist.tracks),
        pipe(playlist, mapTracks(toTraktorTrack), toTraktorPlaylist))
})

traktorPlaylistGenerator('should generate a playlist with two entries when tracks are provided', () => {
    const playlist = pipe(aPlaylist, withXTracks(2))
    const traktorPlaylist = pipe(playlist, mapTracks(toDigest(track => pipe(track, toTraktorTrack, toTraktorEntry))))
    assert.equal(generatePlaylistFrom('the-playlist-name')(traktorPlaylist.tracks),
        pipe(playlist, mapTracks(toTraktorTrack), toTraktorPlaylist))
})

traktorPlaylistGenerator.run()
