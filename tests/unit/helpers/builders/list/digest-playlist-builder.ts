import {aDigest, withRawData} from '../track/digest-builder.js'
import {Playlist, withXTracks as superWithXtracks} from './playlist-builder.js'
import {aTraktorTrack, buildTraktorTrack} from '../track/traktor-track-builder.js'
import {map} from 'ramda'
import { Track } from '../track/track-builder.js'

export function withXTracks(quantity: number, offset: number, playlist: Playlist) {
    const rawData = (track: Track) => withRawData(buildTraktorTrack(aTraktorTrack(track)), aDigest(track))
    return superWithXtracks(quantity, offset, rawData, playlist)
}

export function buildDigestsPlaylist(playlist: Playlist) {
    return playlist.tracks
}

export const DigestPlaylist = {
    of: map(aDigest)
}
