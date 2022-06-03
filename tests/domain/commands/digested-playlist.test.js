import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {DigestBuilder} from '../../helpers/builders/track/digest-builder'
import {DigestedPlaylist} from '../../../src/domain/models/digested-playlist'

const digestedPlaylist = suite('Digested playlist')

const track1 = new DigestBuilder().numberedWith(1).build()
const track2 = new DigestBuilder().numberedWith(2).build()

digestedPlaylist('should return empty array if the two track sets are empty', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack([], []), [])
})

digestedPlaylist('should ignore data that is not song or artist when comparing', () => {
    const trackWithExtraData = {...track1, extraData: 'something'}
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack([track1], [trackWithExtraData]), [trackWithExtraData])
})

digestedPlaylist('should return the same array when the two track sets are equal', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack([track1], [track1]), [track1])
})

digestedPlaylist('should return an array with one coincidence when there is one coincident track', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack(
        [track1], [track1, track2]), [track1])
})

digestedPlaylist('should return an array with one coincidence when there is one coincident track', () => {
    assert.equal(DigestedPlaylist.getNeedlesFromHaystack([track2], [track1, track2]), [track2])
})

digestedPlaylist.run()
