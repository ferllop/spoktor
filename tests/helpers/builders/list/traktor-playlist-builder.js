import {TraktorTrackBuilder} from '../track/traktor-track-builder.js'
import {AbstractTrackListBuilder} from './abstract-track-list-builder.js'
import {TraktorPlaylistGenerator} from '../../../../src/domain/commands/traktor-playlist-generator.js'

export class TraktorPlaylistBuilder extends AbstractTrackListBuilder {
    withXTracks(quantity, offset = 1) {
        return super.withXTracks(quantity, offset, new TraktorTrackBuilder())
    }

    build() {
        const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<MUSICFOLDERS></MUSICFOLDERS>
<COLLECTION ENTRIES="${this.tracks.length}">`
        return header + this.tracks.join('') + this.getFooter()
    }

    getFooter() {
        return `</COLLECTION>
<SETS ENTRIES="0"></SETS>
<PLAYLISTS>
<NODE TYPE="FOLDER" NAME="$ROOT">
<SUBNODES COUNT="1">
<NODE TYPE="PLAYLIST" NAME="the-playlist-name">
<PLAYLIST ENTRIES="${this.tracks.length}" TYPE="LIST" UUID="generatedByTraktor">
${this.getNodePlaylistEntries(this.tracks)}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`
    }

    getNodePlaylistEntries(tracks) {
        return tracks.map(track => {
            return `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${new TraktorPlaylistGenerator().renderFullPath(track)}"></PRIMARYKEY>
</ENTRY>`
        })
    }
}