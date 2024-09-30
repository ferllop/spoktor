import * as assert from 'uvu/assert'
import { Digest } from '../../../src/js/spoktor/domain/digest.js'

export function assertDigestedPlaylistsAreEqual(playlistA: Digest[], playlistB: Digest[]) {
    assert.equal(playlistA.length, playlistB.length, 'Playlist length')
    playlistA.forEach(
        (digest, index) => assertDigestsAreEqual(digest, playlistB[index]),
    )
}

function isDigest(digest: unknown): digest is Digest{
    return typeof digest === 'object' && digest !== null && 'artist' in digest && 'song' in digest
}

export function assertDigestsAreEqual(digestA: Digest, digestB?: Digest) {
    if (!isDigest(digestB)) {
        return assert.unreachable()
    }
    assert.equal(digestA.artist, digestB.artist)
    assert.equal(digestA.song, digestB.song)
    assertStringsAreEqualIgnoringItsFormatting(digestA.rawData, digestB.rawData)
}

export function assertStringsAreEqualIgnoringItsFormatting(stringA: string, stringB: string) {
    assert.equal(unformat(stringA), unformat(stringB))
}

function unformat(str: string) {
    return str
        .replace(/\s/g, '')
        .replace(/\n/g, '')
        .replace(/></g, '>\n<')
}
