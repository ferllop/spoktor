import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {aDigest, withRawData} from './digest-builder.js'
import {aTrack} from './track-builder.js'

const digestBuilder = suite('Digest builder')

/** @type {Digest} */
const digest = {
    artist: 'someArtist',
    song: 'someSong',
    location: '',
    rawData: '',
}

digestBuilder('should build a digest', () => {
    assert.equal(aDigest(aTrack), digest)
})

digestBuilder('should build a digest', () => {
    /** @type {Digest} */
    const expected = {
        ...digest,
        rawData: 'raw-data',
    }
    assert.equal(withRawData('raw-data', aDigest(aTrack)), expected)
})

digestBuilder.run()
