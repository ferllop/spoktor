import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestBuilder} from '../../helpers/builders/track/digest-builder'
import {DigestedPlaylist} from '../../../src/domain/models/digested-playlist'
import {DigestPlaylistBuilder} from '../../helpers/builders/list/digest-playlist-builder'
import {TraktorTrackBuilder} from '../../helpers/builders/track/traktor-track-builder'
import {AugmentedDigest, Digest, DigestsComparator} from '../../../src/domain/models/digest'

const digestedPlaylist = suite('Digested playlist')

const track1 = new DigestBuilder().numberedWith(1).build()
const track2 = new DigestBuilder().numberedWith(2).build()
const alwaysEquals: DigestsComparator = () => true

digestedPlaylist('should return empty array if the two track sets are empty', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack([], [], alwaysEquals), [])
})

digestedPlaylist('should ignore data that is not song or artist when comparing', () => {
    const trackWithExtraData = {...track1, extraData: 'something'}
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack([track1], [trackWithExtraData], alwaysEquals), [trackWithExtraData])
})

digestedPlaylist('should return the same array when the two track sets are equal', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack([track1], [track1], alwaysEquals), [track1])
})

digestedPlaylist('should return an array with one coincidence when there is one coincident track', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack(
        [track1], [track1, track2], Digest.areEqual), [track1])
})

digestedPlaylist('should return an array with one coincidence when there is one coincident track', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack(
        [track2], [track1, track2], Digest.areEqual), [track2])
})

digestedPlaylist('should return an array of one AugmentedDigest with the coincidence found in other digests', () => {
    const receivingDigests = new DigestPlaylistBuilder().withXTracks(1, 0, new TraktorTrackBuilder()).build()
    const needles = new DigestPlaylistBuilder().withXTracks(1, 0, new TraktorTrackBuilder()).build()
    const result = DigestedPlaylist.insertCoincidencesIntoDigests(needles, receivingDigests, Digest.areEqual)
    const expected: AugmentedDigest[] = [{...receivingDigests[0]!, coincidences: DigestedPlaylist.recordPosition(needles)}]
    assert.equal(result, expected)
})

digestedPlaylist('should return an array of two AugmentedDigest with the coincidence found in other two digests', () => {
    const receivingDigests = new DigestPlaylistBuilder().withXTracks(2, 0, new TraktorTrackBuilder()).build()
    const needles = new DigestPlaylistBuilder().withXTracks(2, 0, new TraktorTrackBuilder()).build()
    const result = DigestedPlaylist.insertCoincidencesIntoDigests(needles, receivingDigests, Digest.areEqual)
    const expected: AugmentedDigest[] = [
        {...receivingDigests[0]!, coincidences: [DigestedPlaylist.recordPosition(needles)[0]!]},
        {...receivingDigests[1]!, coincidences: [DigestedPlaylist.recordPosition(needles)[1]!]},
    ]
    assert.equal(result, expected)
})

digestedPlaylist('should return an array of one AugmentedDigest with the coincidence found in other two digests', () => {
    const receivingDigests = new DigestPlaylistBuilder().withXTracks(1, 0, new TraktorTrackBuilder()).build()
    const needles = new DigestPlaylistBuilder().withXTracks(2, 0, new TraktorTrackBuilder()).build()
    const result = DigestedPlaylist.insertCoincidencesIntoDigests(needles, receivingDigests, alwaysEquals)
    const expected: AugmentedDigest[] = [
        {...receivingDigests[0]!, coincidences: DigestedPlaylist.recordPosition(needles)},
    ]
    assert.equal(result, expected)
})

digestedPlaylist.run()
