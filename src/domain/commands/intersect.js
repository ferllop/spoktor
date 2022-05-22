export class Intersect {
    execute(spotifyDigests, traktorDigests) {
        return traktorDigests
            .filter(this.#digestsHasDigest(spotifyDigests))
            .map((digest) => digest.index)
    }

    #digestsHasDigest(digests) {
        return checkingDigest => digests.some(digest => {
            return digest.digest.song === checkingDigest.digest.song
                && digest.digest.artist === checkingDigest.digest.artist
        })
    }
}