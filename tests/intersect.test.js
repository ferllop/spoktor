import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {Intersect} from '../src/Intersect.js'

const intersectTest = suite('Intersect')

intersectTest('should return empty array if the two track sets are empty', () => {
    assert.equal(new Intersect().execute([], []), [])
})

intersectTest('should return the same array when the two track sets are equal', () => {
    const track = {song: 'song1', artist: 'artist1'}
    assert.equal(new Intersect().execute([track], [track]), [track])
})

intersectTest('should return an array with one coincidence when there is one coincident track', () => {
    const track1 = {song: 'song1', artist: 'artist1'}
    const track2 = {song: 'song2', artist: 'artist2'}
    assert.equal(new Intersect().execute([track1], [track1, track2]), [track1])
})

intersectTest.run()