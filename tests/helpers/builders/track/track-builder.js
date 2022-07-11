import {curry, pipe} from 'ramda'

export const GENERIC_ARTIST_NAME = 'artist'
export const GENERIC_SONG_TITLE = 'song'

/** @type {Track} */
export const aTrack = {
    song: 'someSong',
    artist: 'someArtist',
    location: '',
}

/** @returns {Track} */
export function withSong(/** string */ song, /** Track */ track) {
    return {...track, song: song}
}

/** @returns {Track} */
export function withArtists(/** string[] */ artists,  /** Track */ track) {
    return {
        ...track,
        artist: artists.join(','),
    }
}

/** @returns {Track} */
export function withArtist(/** string */ artist, /** Track */ track) {
    return {...track, artist: artist}
}

/** @returns {Track} */
export function withoutArtists(/** Track */ track) {
    return withArtist('', track)
}

/** @returns {Track} */
export function withoutSong(/** Track */ track) {
    return withSong('', track)
}

/** @returns {Track} */
export function numberedWith(/** number */ number, /** Track */ track) {
    return pipe(
        curry(withSong)(GENERIC_SONG_TITLE + number),
        curry(withArtist)(GENERIC_ARTIST_NAME + number))(track)
}
