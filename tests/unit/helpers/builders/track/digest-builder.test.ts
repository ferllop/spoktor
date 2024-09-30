import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {aDigest, toDigest, withRawData} from './digest-builder.js'
import {aTrack} from './track-builder.js'
import { Digest } from '../../../../../src/js/spoktor/domain/digest.js'

const digestBuilder = suite('Digest builder')

const digest: Digest = {
    artist: 'artist',
    song: 'song',
    location: '',
    rawData: '',
}

const emptyRawData = () => ''

digestBuilder('should build a digest', () => {
    assert.equal(toDigest(emptyRawData)(aTrack), digest)
})

digestBuilder('should build a digest', () => {
    const expected = { ...digest, rawData: 'raw-data'}
    assert.equal(withRawData('raw-data')(aDigest(emptyRawData)), expected)
})

digestBuilder.run()
