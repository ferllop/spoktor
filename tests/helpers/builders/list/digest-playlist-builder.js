import {aDigest, withRawData} from '../track/digest-builder.js'
import {withXTracks as superWithXtracks} from './playlist-builder.js'
import {aTraktorTrack, buildTraktorTrack} from '../track/traktor-track-builder.js'
import {map} from 'ramda'

export function withXTracks(/** number */ quantity, /** number */ offset, /** Playlist */ playlist) {
    const rawData = track => withRawData(buildTraktorTrack(aTraktorTrack(track)), aDigest(track))
    return superWithXtracks(quantity, offset, rawData, playlist)
}

export function buildDigestsPlaylist(/** Playlist */ playlist) {
    return playlist.tracks
}

export const DigestPlaylist = {
    of: map(aDigest)
}
