export type Digest = {
    artist: string
    song: string
    rawData: string
}
export type PositionedDigest = Digest & {position: number}
export type AugmentedDigest = Digest & {
    coincidences: PositionedDigest[]
}

export type DigestsComparator = (a: Digest, b: Digest) => boolean
export type DigestComparatorFactory = (a: Digest) => (b: Digest) => boolean

function isValid(candidate: Digest) {
    return candidate.artist.length > 0
        || candidate.song.length > 0
}

function isEqual(digestA: Digest) {
    return (digestB: Digest) => areEqual(digestA, digestB)
}

function areEqual(digestA: Digest, digestB: Digest) {
    return digestA.song === digestB.song
        && digestA.artist === digestB.artist
}

export const Digest = {
    isValid,
    areEqual,
    isEqual,
}
