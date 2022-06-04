import {Digest} from './digest'

type PositionedDigest = Digest & {positionInOrigin: number}
export type DigestedPlaylist = PositionedDigest[]

const EMPTY: PositionedDigest[] = []

function recordPosition(digests: Digest[]): PositionedDigest[] {
    return digests.map((digest, index) => ({...digest, positionInOrigin: index}))
}

function getNeedlesFromHaystack(needles: DigestedPlaylist, haystack: DigestedPlaylist): PositionedDigest[] {
    return haystack.filter(digestsPresentIn(needles))
}

function digestsPresentIn(digests: Digest[]) {
    return (checkingDigest: Digest) => digests.some(digest => {
        return digest.song === checkingDigest.song
            && digest.artist === checkingDigest.artist
    })
}

export const DigestedPlaylist = {
    EMPTY,
    getNeedlesFromHaystack,
    recordPosition,
}

