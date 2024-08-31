import {
    aTrack,
    GENERIC_ARTIST_NAME,
    GENERIC_SONG_TITLE,
    Track,
    withArtist,
    withSong,
} from '../track/track-builder.js'
import {curry, pipe} from 'ramda'

export type Playlist = {
    tracks: Track[],
    playlistName: string,
}

export const aPlaylist: Playlist = {
    tracks: [],
    playlistName: '',
}

export function withPlaylistName(name: string, playlist: Playlist): Playlist {
    return {...playlist, playlistName: name}
}

export function withoutTracks(playlist: Playlist): Playlist {
    return {...playlist, tracks: []}
}

export function withTrack(track: Track, playlist: Playlist): Playlist {
    return {...playlist, tracks: playlist.tracks.concat(track)}
}

export function withXTracks(quantity: number, offset: number, extraDataBuilder: (t: Track) => any, playlist: Playlist): Playlist {
    return {
        ...playlist,
        tracks: playlist.tracks.concat(
            new Array(quantity).fill(null).map((_, index) => {
                const trackNumber = index + offset
                return pipe(
                    () => aTrack,
                    track => withArtist(GENERIC_ARTIST_NAME + trackNumber, track),
                    curry(withSong)(GENERIC_SONG_TITLE + trackNumber),
                    extraDataBuilder,
                )()
            })),
    }
}
