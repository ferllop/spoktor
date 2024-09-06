export type MinimalTrackData = {
    song: string
    artist: string
    location: string
    positionInPlaylist: number
}

export const GENERIC_ARTIST_NAME = 'artist'
export const GENERIC_SONG_TITLE = 'song'
export const GENERIC_POSITION = -1

export const aTrack: MinimalTrackData = {
    song: GENERIC_SONG_TITLE,
    artist: GENERIC_ARTIST_NAME,
    location: '',
    positionInPlaylist: GENERIC_POSITION,
}

export const withSong = 
    (song: string) => (track: MinimalTrackData): MinimalTrackData =>
    ({...track, song})

export const withArtist = 
    (artist: string) => (track: MinimalTrackData): MinimalTrackData => 
    ({...track, artist})

export const withArtists = (artists: string[]) => withArtist(artists.join(','))

export const withoutArtists = withArtist('')

export const withoutSong = withSong('')

export const withPosition = (position: number) => (track: MinimalTrackData): MinimalTrackData =>({
    ...track,
    artist: track.artist + position,
    song: track.song + position,
    positionInPlaylist: position
})
