import {AugmentedDigest, Digest, DigestComparatorFactory, DigestsComparator} from './digest'

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
            coincidences: needles.filter(needle => comparator(receivingDigest, needle)),
        }),
    )
}

export const DigestedPlaylist = {
    EMPTY,
    getNeedlesFromHaystack,
    insertCoincidencesIntoDigests
}

