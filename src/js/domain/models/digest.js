function isValid(/** Digest */ candidate)/** boolean */ {
    return candidate.artist.length > 0
        || candidate.song.length > 0
}

function areEqual(/** Digest */ digestA, /** Digest */ digestB) {
    return digestA.song === digestB.song
        && digestA.artist === digestB.artist
}

function areFuzzyEqual(/** Digest */ digestA, digestB) /** boolean */ {
    return fuzzyCompare(digestA.song, digestB.song)
        && fuzzyCompare(digestA.artist, digestB.artist)
}

function fuzzyCompare(/** string */ needleRaw, /** string */ haystackRaw) /** boolean */ {
    const clean = (/** string */ str) => str.replace(/(.)\1+/g, '$1').replace(/[- '()_,.]/g, '-').replaceAll('&', 'and').toLowerCase()
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
