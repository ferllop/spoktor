import {areFuzzyEqual, ComparedDigest, Digest, DigestsComparator, PositionedDigest} from './digest.js'

export const EMPTY: Digest[] = []

export const intersect = (needles: Digest[], haystack: Digest[]): ComparedDigest[] => {
    const coincidences = getNeedlesFromHaystack(needles, haystack, areFuzzyEqual)
    return needles.map(recordCoincidences(coincidences, areFuzzyEqual))
}

export const getNeedlesFromHaystack = (
    needles: Digest[], 
    haystack: Digest[], 
    comparator: DigestsComparator
): Digest[] => haystack.filter(isInNeedles(needles, comparator))

const isInNeedles = 
    (digests: Digest[], comparator: DigestsComparator) => (checkingDigest: Digest) =>
        digests.some(comparator(checkingDigest))

export const recordCoincidences = 
    (needles: Digest[], comparator: DigestsComparator) => 
        (receivingDigest: Digest): ComparedDigest => ({
            ...receivingDigest,
            coincidences: needles.map(recordPosition).filter(comparator(receivingDigest)),
        })

export const recordPosition = (digest: Digest, position: number): PositionedDigest => ({
        ...digest,
        position,
    })
