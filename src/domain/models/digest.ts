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
        const needle = clean(needleRaw)
        const haystack = clean(haystackRaw)
        const needleLength = needle.length
        const haystackLength = haystack.length
        if (needleLength > haystackLength) {
            return false
        }
        if (needleLength === haystackLength) {
            return needle === haystack
        }
        outer: for (let i = 0, j = 0; i < needleLength; i++) {
            const nch = needle.charCodeAt(i)
            while (j < haystackLength) {
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
