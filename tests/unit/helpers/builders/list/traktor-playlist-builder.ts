import { Playlist } from './playlist-builder.js'
import {toTraktorEntry, TraktorTrackData} from '../track/traktor-track-builder.js'
import { MinimalTrackData } from '../track/track-builder.js'

export function toTraktorPlaylist(playlist: Playlist<TraktorTrackData>) {
    return header(playlist) + playlist.tracks.map(toTraktorEntry).join('') + footer(playlist)
}

function header(playlist: Playlist<MinimalTrackData>) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<MUSICFOLDERS></MUSICFOLDERS>
<COLLECTION ENTRIES="${playlist.tracks.length}">`
}

function footer(playlist: Playlist<TraktorTrackData>) {
    return `</COLLECTION>
<SETS ENTRIES="0"></SETS>
<PLAYLISTS>
<NODE TYPE="FOLDER" NAME="$ROOT">
<SUBNODES COUNT="1">
<NODE TYPE="PLAYLIST" NAME="the-playlist-name">
<PLAYLIST ENTRIES="${playlist.tracks.length}" TYPE="LIST" UUID="generatedByTraktor">
${playlist.tracks.map(entry).join('')}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`
}

const entry = (track: TraktorTrackData) => `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${track.location}"></PRIMARYKEY>
</ENTRY>`

