import * as assert from 'uvu/assert'
import {TraktorParser} from '../../src/models/parsers/traktor-parser.js'

export function assertDigestPlaylistsAreEqual(playlistA, playlistB) {
    assert.equal(playlistA.length, playlistB.length)
    playlistA.forEach(
        (digest, index) => assertDigestsAreEqual(digest, playlistB[index]),
    )
}

export function assertDigestsAreEqual(digestA, digestB) {
    assert.equal(digestA.artist, digestB.artist)
    assert.equal(digestA.song, digestB.song)
    if ('traktorData' in digestA
        && 'traktorData' in digestB) {
        assertTraktorTracksAreEqual(digestA.traktorData, digestB.traktorData)
    }
}

export function assertTraktorTracksAreEqual(trackA, trackB) {
    const traktorParser = new TraktorParser()
    const artistA = traktorParser.extractArtist(trackA)
    const artistB = traktorParser.extractArtist(trackB)
    assert.equal(artistA, artistB)
    const songA = traktorParser.extractSong(trackA)
    const songB = traktorParser.extractSong(trackB)
    assert.equal(songA, songB)
}