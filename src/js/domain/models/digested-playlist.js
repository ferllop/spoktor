import {Digest} from './digest.js'

/** @type {Digest[]} */
const EMPTY = []

function digestsPresentIn(/** Digest[] */ digests, /** DigestsComparator */ comparator) {
    return (/** Digest */ checkingDigest) => digests.some(digest => comparator(digest, checkingDigest))
}

function getNeedlesFromHaystack(/** Digest[] */ needles, /** Digest[] */ haystack, /** DigestsComparator */ comparator) /** Digest[] */{
    return haystack.filter(digestsPresentIn(needles, comparator))
}

function insertCoincidencesIntoDigests(/** Digest[] */ needles, /** Digest[] */ receivingDigests, /** DigestsComparator */ comparator) /** AugmentedDigest[] */ {
    return receivingDigests.map(receivingDigest => ({
            ...receivingDigest,
            coincidences: recordPosition(needles).filter(needle => comparator(receivingDigest, needle)),
        }),
    )
}

function intersect(/** Digest[] */ needles, /** Digest[] */ haystack) /** AugmentedDigest[] */ {
    const comparator = Digest.areFuzzyEqual
    const coincidences = DigestedPlaylist.getNeedlesFromHaystack(needles, haystack, comparator)
    return DigestedPlaylist.insertCoincidencesIntoDigests(coincidences, needles, comparator)
}

function recordPosition(/** Digest[] */ digests) /** PositionedDigest[] */ {
    return digests.map((digest, index) => ({
        ...digest,
        position: index,
    }))
}

export const DigestedPlaylist = {
    EMPTY,
    getNeedlesFromHaystack,
    insertCoincidencesIntoDigests,
    recordPosition,
    intersect,
}
