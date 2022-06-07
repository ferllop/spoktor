import {AugmentedDigest, Digest, DigestComparatorFactory, DigestsComparator, PositionedDigest} from './digest'

const EMPTY: Digest[] = []

function digestsPresentIn(digests: Digest[], comparator: DigestComparatorFactory) {
    return (checkingDigest: Digest) => digests.some(comparator(checkingDigest))
}

function digestsEquallyPresentIn(digests: Digest[]) {
    return digestsPresentIn(digests, Digest.isEqual)
}

function getNeedlesFromHaystack(needles: Digest[], haystack: Digest[]): Digest[] {
    return haystack.filter(digestsEquallyPresentIn(needles))
}

function insertCoincidencesIntoDigests(needles: Digest[], receivingDigests: Digest[], comparator: DigestsComparator): AugmentedDigest[] {
    return receivingDigests.map(receivingDigest => ({
            ...receivingDigest,
            coincidences: recordPosition(needles).filter(needle => comparator(receivingDigest, needle)),
        }),
    )
}

function recordPosition(digests: Digest[]): PositionedDigest[] {
    return digests.map((digest, index) => ({
        ...digest,
        position: index
    }))
}

export const DigestedPlaylist = {
    EMPTY,
    getNeedlesFromHaystack,
    insertCoincidencesIntoDigests,
    recordPosition,
}

