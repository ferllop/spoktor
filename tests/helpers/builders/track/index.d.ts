export type Track = {
    song: string
    artist: string
    location: string
}

export type TraktorTrack = Track & {
    directory: string
    volume: string
    filename: string
}
