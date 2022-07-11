export type Digest = {
    artist: string
    song: string
    location: string
    rawData: string
}

export type PositionedDigest = Digest & { position: number }
export type AugmentedDigest = Digest & {
    coincidences: PositionedDigest[]
}

export type DigestsComparator = (a: Digest, b: Digest) => boolean
export type DigestComparatorFactory = (a: Digest) => (b: Digest) => boolean
export type isValid<T> = (num: T) => boolean
