import {buildTraktorTrack} from '../track/traktor-track-builder.js'
import {withXTracks as superWithXTracks} from './playlist-builder.js'

export function withXTracks(/** number */ quantity, /** number */ offset, /** Playlist */ playlist) {
    return superWithXTracks(quantity, offset, buildTraktorTrack, playlist)
}

export function buildTraktorCollection(/** Playlist */ playlist) {
    const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<COLLECTION ENTRIES="${playlist.tracks.length}">`
    const footer = '</COLLECTION></NML>'
    return header + playlist.tracks.map(buildTraktorTrack).join('') + footer
}
