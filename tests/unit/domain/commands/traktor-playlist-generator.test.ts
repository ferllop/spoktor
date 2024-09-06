import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {aPlaylist, mapTracks, withoutTracks, withXTracks} from '../../helpers/builders/list/playlist-builder.js'
import {toTraktorPlaylist} from '../../helpers/builders/list/traktor-playlist-builder.js'
import { generatePlaylistFrom } from '../../../../src/js/domain/models/traktor-raw-playlist.js'
import { toTraktorTrack, TraktorTrackData } from '../../helpers/builders/track/traktor-track-builder.js'
import { pipe } from '../../../fp.js'

const traktorPlaylistGenerator = suite('Traktor playlist generator')

traktorPlaylistGenerator('should generate a playlist with no entries when zero digests are provided', () => {
    const playlist: TraktorTrackData[] = []
    assert.equal(generatePlaylistFrom(playlist, 'the-playlist-name'),
        pipe(aPlaylist, withoutTracks, mapTracks(toTraktorTrack), toTraktorPlaylist))
})

traktorPlaylistGenerator('should generate a playlist with one entry when one track is provided', () => {
    const playlist = pipe(aPlaylist, withXTracks(1))
    const traktorPlaylist = mapTracks(toTraktorTrack)(playlist)
    assert.equal(generatePlaylistFrom(traktorPlaylist.tracks, 'the-playlist-name'),
        pipe(playlist, mapTracks(toTraktorTrack), toTraktorPlaylist))
})

traktorPlaylistGenerator('should generate a playlist with two entries when tracks are provided', () => {
    const playlist = pipe(aPlaylist, withXTracks(2))
    const traktorPlaylist = mapTracks(toTraktorTrack)(playlist)
    assert.equal(generatePlaylistFrom(traktorPlaylist.tracks, 'the-playlist-name'),
        pipe(playlist, mapTracks(toTraktorTrack), toTraktorPlaylist))
})

traktorPlaylistGenerator.run()
