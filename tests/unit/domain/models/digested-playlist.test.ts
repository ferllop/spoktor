import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestedPlaylist} from '../../../../src/js/domain/models/digested-playlist.js'
import {DigestPlaylist, withXTracks} from '../../helpers/builders/list/digest-playlist-builder.js'
import {Digest} from '../../../../src/js/domain/models/digest.js'
import {aTrack, numberedWith} from '../../helpers/builders/track/track-builder.js'
import {aDigest} from '../../helpers/builders/track/digest-builder.js'
import {aPlaylist} from '../../helpers/builders/list/playlist-builder.js'
import {compose, prop} from 'ramda'

const digestedPlaylist = suite('Digested playlist')

const track1 = aDigest(numberedWith(1, aTrack))
const track2 = aDigest(numberedWith(2, aTrack))
const someDigests = compose(DigestPlaylist.of, prop('tracks'), withXTracks)

const alwaysEquals = () => true

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
    const receivingDigests = someDigests(1, 0, aPlaylist)
    const needles = someDigests(1, 0, aPlaylist)
    const result = DigestedPlaylist.insertCoincidencesIntoDigests(needles, receivingDigests, Digest.areEqual)
    const expected = [{...receivingDigests[0], coincidences: DigestedPlaylist.recordPosition(needles)}]
    assert.equal(result, expected)
})

digestedPlaylist('should return an array of two AugmentedDigest with the coincidence found in other two digests', () => {
    const receivingDigests = someDigests(2, 0, aPlaylist)
    const needles = someDigests(2, 0, aPlaylist)
    const result = DigestedPlaylist.insertCoincidencesIntoDigests(needles, receivingDigests, Digest.areEqual)
    const expected = [
        {...receivingDigests[0], coincidences: [DigestedPlaylist.recordPosition(needles)[0]]},
        {...receivingDigests[1], coincidences: [DigestedPlaylist.recordPosition(needles)[1]]},
    ]
    assert.equal(result, expected)
})

digestedPlaylist('should return an array of one AugmentedDigest with the coincidence found in other two digests', () => {
    const receivingDigests = someDigests(1, 0, aPlaylist)
    const needles = someDigests(2, 0, aPlaylist)
    const result = DigestedPlaylist.insertCoincidencesIntoDigests(needles, receivingDigests, alwaysEquals)
    const expected = [
        {...receivingDigests[0], coincidences: DigestedPlaylist.recordPosition(needles)},
    ]
    assert.equal(result, expected)
})

digestedPlaylist.run()
