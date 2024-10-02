import { Digest } from "../../digest.js"
import { PlaylistGenerator } from "../playlist-generator.js"

export const generatePlaylistFrom: PlaylistGenerator = playlistName => digests => 
    `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<MUSICFOLDERS></MUSICFOLDERS>
<COLLECTION ENTRIES="${digests.length}">${digests.map(digest => digest.rawData).join('')}</COLLECTION>
<SETS ENTRIES="0"></SETS>
<PLAYLISTS>
<NODE TYPE="FOLDER" NAME="$ROOT">
<SUBNODES COUNT="1">
<NODE TYPE="PLAYLIST" NAME="${playlistName}">
<PLAYLIST ENTRIES="${digests.length}" TYPE="LIST" UUID="generatedByTraktor">
${digests.map(toEntry).join('')}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`

const toEntry = (digest: Digest) => 
    `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${digest.location}"></PRIMARYKEY>
</ENTRY>`
