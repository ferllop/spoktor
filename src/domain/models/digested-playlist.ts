import {Digest} from './digest'

type PositionedDigest = Digest & {positionInOrigin: number}
type DigestedPlaylist = PositionedDigest[]

const EMPTY: PositionedDigest[] = []

function recordPosition(digests: Digest[]): PositionedDigest[] {
    return digests.map((digest, index) => ({...digest, positionInOrigin: index}))
}

function getNeedlesFromHaystack(needles: DigestedPlaylist, haystack: DigestedPlaylist) {
    return getPositionInHaystack(haystack, needles)
        .map(coincidentDigest => haystack[coincidentDigest])

}

function digestsPresentIn(digests: Digest[]) {
    return (checkingDigest: Digest) => digests.some(digest => {
        return digest.song === checkingDigest.song
            && digest.artist === checkingDigest.artist
    })
}

function getPositionInHaystack(haystack: DigestedPlaylist, needles: DigestedPlaylist) {
    return recordPosition(haystack)
        .filter(digestsPresentIn(needles))
        .map((digest) => digest.positionInOrigin)
}

export const DigestedPlaylist = {
    EMPTY,
    getNeedlesFromHaystack,
    recordPosition,
}

