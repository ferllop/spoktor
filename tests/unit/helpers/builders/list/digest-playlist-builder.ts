import { Playlist } from './playlist-builder.js'
import { MinimalTrackData } from '../track/track-builder.js'
import { toDigest } from '../track/digest-builder.js'

export const toDigestsPlaylist = 
    (rawDataCreator: (track: MinimalTrackData) => string) => (playlist: Playlist<MinimalTrackData>) => 
    playlist.tracks.map(toDigest(rawDataCreator))

