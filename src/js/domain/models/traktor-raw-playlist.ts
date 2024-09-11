import { Digest } from "./digest.js"

export const generatePlaylistFrom = (tracks: Digest[], playlistName: string) => 
    `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<MUSICFOLDERS></MUSICFOLDERS>
<COLLECTION ENTRIES="${tracks.length}">${tracks.map(digest => digest.rawData).join('')}</COLLECTION>
<SETS ENTRIES="0"></SETS>
<PLAYLISTS>
<NODE TYPE="FOLDER" NAME="$ROOT">
<SUBNODES COUNT="1">
<NODE TYPE="PLAYLIST" NAME="${playlistName}">
<PLAYLIST ENTRIES="${tracks.length}" TYPE="LIST" UUID="generatedByTraktor">
${tracks.map(toEntry).join('')}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`

const toEntry = (track: Digest) => 
    `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${track.location}"></PRIMARYKEY>
</ENTRY>`
