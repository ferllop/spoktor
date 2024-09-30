import { aTrack, MinimalTrackData, withPosition } from "../track/track-builder.js"
import { pipe } from '../../../../../src/js/lib/fp.js'

export type Playlist<T> = {
    tracks: T[],
    playlistName: string,
}

export const aPlaylist: Playlist<MinimalTrackData> = {
    tracks: [],
    playlistName: '',
}

export const withPlaylistName = 
    (name: string) => <T>(playlist: Playlist<T>): Playlist<T> =>
    ({...playlist, playlistName: name})

export const withoutTracks = <T>(playlist: Playlist<T>): Playlist<T> =>
    ({...playlist, tracks: []})

export const withTracks = 
    <T>(tracks: T[]) => (playlist: Playlist<T>): Playlist<T> =>
    ({...playlist, tracks: playlist.tracks.concat(tracks)})

export const withXTracks = 
    (quantity: number) => (playlist: Playlist<MinimalTrackData>): Playlist<MinimalTrackData> => 
    pipe(
        playlist,
        withTracks(
            new Array<MinimalTrackData>(quantity).fill(aTrack)
                .map((_ , index) => 
                    pipe(aTrack, withPosition(playlist.tracks.length + index + 1))),
        )
    )

export const mapTracks = 
    <T, U>(f: (track: T) => U) => (playlist: Playlist<T>): Playlist<U> => 
    ({...playlist, tracks: playlist.tracks.map(f)})

