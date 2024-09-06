import { toTraktorEntry, TraktorTrackData } from "../../../../tests/unit/helpers/builders/track/traktor-track-builder.js"

export const generatePlaylistFrom = (tracks: TraktorTrackData[], playlistName: string) => {
    const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<MUSICFOLDERS></MUSICFOLDERS>
<COLLECTION ENTRIES="${tracks.length}">`

    const footer = `</COLLECTION>
<SETS ENTRIES="0"></SETS>
<PLAYLISTS>
<NODE TYPE="FOLDER" NAME="$ROOT">
<SUBNODES COUNT="1">
<NODE TYPE="PLAYLIST" NAME="${playlistName}">
<PLAYLIST ENTRIES="${tracks.length}" TYPE="LIST" UUID="generatedByTraktor">
${entries(tracks).join('')}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`

    return header +
        tracks.map(toTraktorEntry).join('') +
        footer
}

const entries = (tracks: TraktorTrackData[]) => {
    return tracks.map(digest => {
        return `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${digest.location}"></PRIMARYKEY>
</ENTRY>`
    })
}
