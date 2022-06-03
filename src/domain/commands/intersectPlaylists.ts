import {Digest} from '../models/digest'

type DigestListItem = {
    index: number
    digest: Digest
}
function digestsHasDigest(digests: DigestListItem[]) {
    return (checkingDigest: DigestListItem) => digests.some(digest => {
        return digest.digest.song === checkingDigest.digest.song
            && digest.digest.artist === checkingDigest.digest.artist
    })
}

function intersectPlaylists(spotifyDigests: DigestListItem[], traktorDigests: DigestListItem[]) {
    return traktorDigests
        .filter(digestsHasDigest(spotifyDigests))
        .map((digest) => digest.index)
}

export {
    intersectPlaylists
}
