import { pipe } from 'ramda'

export type Track = {
    song: string
    artist: string
    location: string
}

export const GENERIC_ARTIST_NAME = 'artist'
export const GENERIC_SONG_TITLE = 'song'

export const aTrack: Track = {
    song: 'someSong',
    artist: 'someArtist',
    location: '',
}

export function withSong(song: string, track: Track): Track {
    return {...track, song: song}
}

export function withArtists(artists: string[], track: Track): Track {
    return {
        ...track,
        artist: artists.join(','),
    }
}

export function withArtist(artist: string, track: Track): Track {
    return {...track, artist: artist}
}

export function withoutArtists(track: Track): Track {
    return withArtist('', track)
}

export function withoutSong(track: Track): Track {
    return withSong('', track)
}

export function numberedWith(number: number, track: Track): Track {
    return pipe(
        track => withSong(GENERIC_SONG_TITLE + number, track),
        track => withArtist(GENERIC_ARTIST_NAME + number, track),
    )(track)
}
