import {
    aTrack,
    GENERIC_ARTIST_NAME,
    GENERIC_SONG_TITLE,
    withArtist,
    withSong,
} from '../track/track-builder.js'
import {curry, pipe} from 'ramda'

/** @type {Playlist} */
export const aPlaylist = {
    tracks: [],
    playlistName: '',
}

/** @returns {Playlist} */
export function withPlaylistName(/** string */ name, /** Playlist */ playlist) {
    return {...playlist, playlistName: name}
}

/** @returns {Playlist} */
export function withoutTracks(/** Playlist */ playlist) {
    return {...playlist, tracks: []}
}

/** @returns {Playlist} */
export function withTrack(/** Track */ track, /** Playlist */ playlist) {
    return {...playlist, tracks: playlist.tracks.concat(track)}
}

/** @returns {Playlist} */
export function withXTracks(/** number */ quantity, /** number */ offset, /** function(Track): any */ extraDataBuilder, /** Playlist */ playlist) {
    return {
        ...playlist,
        tracks: playlist.tracks.concat(new Array(quantity)
            .fill(null)
            .map((_, index) => {
                const trackNumber = index + offset
                return pipe(
                    () => aTrack,
                    curry(withArtist)(GENERIC_ARTIST_NAME + trackNumber),
                    curry(withSong)(GENERIC_SONG_TITLE + trackNumber),
                    extraDataBuilder,
                )()
            })),
    }
}
