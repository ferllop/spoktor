import {TraktorXmlParser} from '../../../../../src/js/domain/parsers/traktor-xml-parser.js'
import {withXTracks as superWithXTracks} from './playlist-builder.js'
import {buildTraktorTrack} from '../track/traktor-track-builder.js'
import {compose, concat, join, map, prop} from 'ramda'

export function withXTracks(/** number */ quantity, /** number */ offset, /** Playlist */ playlist) {
    return superWithXTracks(quantity, offset, buildTraktorTrack, playlist)
}

export function buildTraktorPlaylist(/** Playlist */ playlist) {
    const rawDataFromDigests = map(prop('rawData'), prop('tracks', playlist))
    return compose(
        concat(header(playlist)),
        concat(join('', rawDataFromDigests)),
        footer)(playlist)
}

function header(/** Playlist */ playlist) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<MUSICFOLDERS></MUSICFOLDERS>
<COLLECTION ENTRIES="${playlist.tracks.length}">`
}

function footer(/** Playlist */ playlist) {
    return `</COLLECTION>
<SETS ENTRIES="0"></SETS>
<PLAYLISTS>
<NODE TYPE="FOLDER" NAME="$ROOT">
<SUBNODES COUNT="1">
<NODE TYPE="PLAYLIST" NAME="the-playlist-name">
<PLAYLIST ENTRIES="${playlist.tracks.length}" TYPE="LIST" UUID="generatedByTraktor">
${getNodePlaylistEntries(map(prop('rawData'), playlist.tracks)).join('')}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`
}

function getNodePlaylistEntries(/** string[] */ tracks) {
    return tracks.map(track => {
        return `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${TraktorXmlParser.extractLocation(track)}"></PRIMARYKEY>
</ENTRY>`
    })
}

