import {Digest} from './digest'

export type DigestedPlaylist = Digest[]

const EMPTY: Digest[] = []

function getNeedlesFromHaystack(needles: DigestedPlaylist, haystack: DigestedPlaylist): Digest[] {
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

