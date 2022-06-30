import * as assert from 'uvu/assert'

export function assertDigestedPlaylistsAreEqual(/** Digest[] */ playlistA, /** Digest[] */ playlistB) {
    assert.equal(playlistA.length, playlistB.length, 'Playlist length')
    playlistA.forEach(
        (digest, index) => assertDigestsAreEqual(digest, playlistB[index]),
    )
}

function isDigest(/** Digest? */ digest) /** boolean */ {
    return typeof digest !== 'undefined' && 'artist' in digest && 'song' in digest
}

export function assertDigestsAreEqual(/** Digest */ digestA, /** Digest? */ digestB) {
    if (!isDigest(digestB)) {
        return assert.unreachable()
    }
    assert.equal(digestA.artist, digestB.artist)
    assert.equal(digestA.song, digestB.song)
    assertStringsAreEqualIgnoringItsFormatting(digestA.rawData, digestB.rawData)
}

export function assertStringsAreEqualIgnoringItsFormatting(/** string */ stringA, /** string */ stringB) {
    assert.equal(unformat(stringA), unformat(stringB))
}

function unformat(/** string */ str) {
    return str
        .replace(/\s/g, '')
        .replace(/\n/g, '')
        .replace(/></g, '>\n<')
}
