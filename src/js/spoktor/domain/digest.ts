export type Digest = {
    artist: string
    song: string
    location: string
    rawData: string
}

export type isValid<T> = (num: T) => boolean
export type PositionedDigest = Digest & { position: number }
export type ComparedDigest = Digest & { coincidences: PositionedDigest[] }
export type DigestsComparator = (haystackDigest: Digest)=> (needleDigest: Digest) => boolean

export const isValid = (candidate: Digest) =>
    candidate.artist.length > 0 || candidate.song.length > 0

export const areEqual = (digestA: Digest) => (digestB: Digest) => 
    digestA.song === digestB.song && digestA.artist === digestB.artist

export const areFuzzyEqual = (needleDigest: Digest) => (haystackDigest: Digest): boolean =>
    fuzzyCompare(needleDigest.song, haystackDigest.song)
        && fuzzyCompare(needleDigest.artist, haystackDigest.artist)

const fuzzyCompare = (needleRaw: string, haystackRaw: string): boolean => {

    const clean = (str: string) => 
        str.replace(/(.)\1+/g, '$1')
            .replace(/[- '()_,.]/g, '-')
            .replaceAll('&', 'and')
            .toLowerCase()

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
