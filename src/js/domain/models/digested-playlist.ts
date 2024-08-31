import {AugmentedDigest, Digest, DigestsComparator, PositionedDigest} from './digest.js'

const EMPTY: Digest[] = []

function digestsPresentIn(digests: Digest[], comparator: DigestsComparator) {
    return (checkingDigest: Digest) => digests.some(digest => comparator(digest, checkingDigest))
}

function getNeedlesFromHaystack(needles: Digest[], haystack: Digest[], comparator: DigestsComparator): Digest[] {
    return haystack.filter(digestsPresentIn(needles, comparator))
}

function insertCoincidencesIntoDigests(needles: Digest[], receivingDigests: Digest[], comparator: DigestsComparator): AugmentedDigest[] {
    return receivingDigests.map(receivingDigest => ({
            ...receivingDigest,
            coincidences: recordPosition(needles).filter(needle => comparator(receivingDigest, needle)),
        }),
    )
}

function intersect(needles: Digest[], haystack: Digest[]): AugmentedDigest[] {
    const comparator = Digest.areFuzzyEqual
    const coincidences = DigestedPlaylist.getNeedlesFromHaystack(needles, haystack, comparator)
    return DigestedPlaylist.insertCoincidencesIntoDigests(coincidences, needles, comparator)
}

function recordPosition(digests: Digest[]): PositionedDigest[] {
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
