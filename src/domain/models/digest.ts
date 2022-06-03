type Digest = {
    artist: string
    song: string
    rawData: string
}

function isValid(candidate: Digest) {
    return candidate.artist.length > 0
        || candidate.song.length > 0
}

export const Digest = {
    isValid,
}
