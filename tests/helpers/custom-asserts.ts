import * as assert from 'uvu/assert'
import {DigestedPlaylist} from '../../src/domain/models/digested-playlist'
import {Digest} from '../../src/domain/models/digest'

export function assertDigestedPlaylistsAreEqual(playlistA: DigestedPlaylist, playlistB: DigestedPlaylist) {
    assert.equal(playlistA.length, playlistB.length, 'Playlist length')
    playlistA.forEach(
        (digest, index) => assertDigestsAreEqual(digest, playlistB[index]),
    )
}

function isDigest(digest?: Digest): digest is Digest {
    return typeof digest !== 'undefined' && 'artist' in digest && 'song' in digest
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
