import {Digest} from './digest'

const EMPTY: Digest[] = []

function getNeedlesFromHaystack(needles: Digest[], haystack: Digest[]): Digest[] {
    return haystack.filter(digestsPresentIn(needles))
}

function digestsPresentIn(digests: Digest[]) {
    return (checkingDigest: Digest) => digests.some(digest => {
        return digest.song === checkingDigest.song
            && digest.artist === checkingDigest.artist
    })
}

export const DigestedPlaylist = {
    EMPTY,
    getNeedlesFromHaystack,
}

