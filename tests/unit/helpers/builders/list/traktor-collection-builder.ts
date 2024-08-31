import {buildTraktorTrack} from '../track/traktor-track-builder.js'
import {Playlist, withXTracks as superWithXTracks} from './playlist-builder.js'

export function withXTracks(quantity: number, offset: number, playlist: Playlist) {
    return superWithXTracks(quantity, offset, buildTraktorTrack, playlist)
}

export function buildTraktorCollection(playlist: Playlist) {
    const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<COLLECTION ENTRIES="${playlist.tracks.length}">`
    const footer = '</COLLECTION></NML>'
    return header + playlist.tracks.map(buildTraktorTrack).join('') + footer
}
