import * as assert from 'uvu/assert'

export function assertDigestListsAreEqual(playlistA, playlistB) {
    assert.equal(playlistA.length, playlistB.length, 'Playlist length')
    const digestsA = playlistA.map(item => item.digest)
    const digestsB = playlistB.map(item => item.digest)
    digestsA.forEach(
        (digest, index) => assertDigestsAreEqual(digest, digestsB[index]),
    )
}

export function assertDigestsAreEqual(digestA, digestB) {
    assert.equal(digestA.artist, digestB.artist)
    assert.equal(digestA.song, digestB.song)
    assertRawDataAreEqual(digestA.rawData, digestB.rawData)
}

export function assertRawDataAreEqual(dataA, dataB) {
    assert.equal(equalizeString(dataA), equalizeString(dataB))
}

function equalizeString(str) {
    return str.replace(/\s/g, '').replace(/\n/g, '').replace(/></g, '>\n<')
}