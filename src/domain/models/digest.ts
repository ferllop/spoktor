export type Digest = {
    artist: string
    song: string
    rawData: string
}
export type PositionedDigest = Digest & { position: number }
export type AugmentedDigest = Digest & {
    coincidences: PositionedDigest[]
}

export type DigestsComparator = (a: Digest, b: Digest) => boolean
export type DigestComparatorFactory = (a: Digest) => (b: Digest) => boolean

function isValid(candidate: Digest) {
    return candidate.artist.length > 0
        || candidate.song.length > 0
}

function areEqual(digestA: Digest, digestB: Digest) {
    return digestA.song === digestB.song
        && digestA.artist === digestB.artist
}

function areFuzzyEqual(digestA: Digest, digestB: Digest): boolean {
    return fuzzyCompare(digestA.song, digestB.song)
        && fuzzyCompare(digestA.artist, digestB.artist)
}

function fuzzyCompare(needleRaw: string, haystackRaw: string): boolean {
    const clean = (str: string) => str.replace(/(.)\1+/g, '$1').replace(/[- '()_,.]/g, '-').replaceAll('&', 'and').toLowerCase()
    let needle = clean(needleRaw)
    let haystack = clean(haystackRaw)
    if (needle.length > haystack.length) {
        const tmp = haystack
        haystack = needle
        needle = tmp
    }
    if (needle.length === 0 || haystack.length === 0) {
         return needle === haystack
    }
    outer: for (let i = 0, j = 0; i < needle.length; i++) {
        const nch = needle.charCodeAt(i)
        while (j < haystack.length) {
            if (haystack.charCodeAt(j++) === nch) {
                continue outer
            }
        }
        return false
    }
    return true
}

export const Digest = {
    isValid,
    areEqual,
    areFuzzyEqual,
}
