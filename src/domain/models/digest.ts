export type Digest = {
    artist: string
    song: string
    rawData: string
}

export function isValid(candidate: Digest) {
    return candidate.artist.length > 0
        || candidate.song.length > 0
}

export const Digest = {
    isValid,
}
