import {areFuzzyEqual, AugmentedDigest, Digest, DigestsComparator, PositionedDigest} from './digest.js'

export const EMPTY: Digest[] = []

export const intersect = (needles: Digest[], haystack: Digest[]): AugmentedDigest[] => {
    const coincidences = getNeedlesFromHaystack(needles, haystack, areFuzzyEqual)
    return needles.map(recordCoincidences(coincidences, areFuzzyEqual))
}

export const getNeedlesFromHaystack = (
    needles: Digest[], 
    haystack: Digest[], 
    comparator: DigestsComparator
): Digest[] => haystack.filter(digestsPresentIn(needles, comparator))

const digestsPresentIn = 
    (digests: Digest[], comparator: DigestsComparator) => (checkingDigest: Digest) =>
        digests.some(digest => comparator(digest, checkingDigest))

export const recordCoincidences = 
    (needles: Digest[], comparator: DigestsComparator) => (receivingDigest: Digest) => ({
            ...receivingDigest,
            coincidences: needles.map(recordPosition).filter(needle => comparator(receivingDigest, needle)),
        })

export const recordPosition = (digest: Digest, position: number): PositionedDigest => ({
        ...digest,
        position,
    })
