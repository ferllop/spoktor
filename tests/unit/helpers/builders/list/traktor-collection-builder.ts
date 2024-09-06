import {toTraktorEntry, TraktorTrackData} from '../track/traktor-track-builder.js'
import {Playlist} from './playlist-builder.js'

export function toTraktorCollection(playlist: Playlist<TraktorTrackData>) {
    const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<COLLECTION ENTRIES="${playlist.tracks.length}">`
    const footer = '</COLLECTION></NML>'
    return header + playlist.tracks.map(toTraktorEntry).join('') + footer
}
