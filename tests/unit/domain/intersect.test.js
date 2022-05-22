import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {Intersect} from '../../../src/domain/intersect.js'

const intersectTest = suite('Intersect')

const track1 = {index: 0, digest: {song: 'song1', artist: 'artist1'}}
const track2 = {index: 1, digest: {song: 'song2', artist: 'artist2'}}

intersectTest('should return empty array if the two track sets are empty', () => {
    assert.equal(new Intersect().execute([], []), [])
})

intersectTest('should ignore data that is not song or artist when comparing', () => {
    const trackWithExtraData = {...track1, extraData: 'something'}
    assert.equal(new Intersect().execute([track1], [trackWithExtraData]), [0])
})

intersectTest('should return the same array when the two track sets are equal', () => {
    assert.equal(new Intersect().execute([track1], [track1]), [0])
})

intersectTest('should return an array with one coincidence when there is one coincident track', () => {
    assert.equal(new Intersect().execute(
        [track1], [track1, track2]), [0])
})

intersectTest('should return an array with one coincidence when there is one coincident track', () => {
    assert.equal(new Intersect().execute([track2], [track1, track2]), [1])
})

intersectTest.run()