import {TraktorXmlParser} from '../parsers/traktor-xml-parser'
import {Digest} from './digest'

export const TraktorRawPlaylist = {
    renderFullFilePathFrom,
    generatePlaylistFrom,
    normalizeRawFullFilePathFrom,
}

function renderFullFilePathFrom(rawTrack: string) {
    const traktorParser = TraktorXmlParser
    const volume = traktorParser.extractVolume(rawTrack)
    const directoryPath = traktorParser.extractDir(rawTrack)
    const filename = traktorParser.extractFilename(rawTrack)
    return volume + directoryPath + filename
}

function normalizeRawFullFilePathFrom(rawFullFilePath: string) {
    return rawFullFilePath.replaceAll('/:', '\\')
}

function getNodePlaylistEntries(digests: Digest[]) {
    return digests.map(digest => {
        const filePath = renderFullFilePathFrom(digest.rawData)
        return `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${filePath}"></PRIMARYKEY>
</ENTRY>`
    })
}

function generatePlaylistFrom(digests: Digest[], playlistName: string) {
    const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<MUSICFOLDERS></MUSICFOLDERS>
<COLLECTION ENTRIES="${digests.length}">`

    const footer = `</COLLECTION>
<SETS ENTRIES="0"></SETS>
<PLAYLISTS>
<NODE TYPE="FOLDER" NAME="$ROOT">
<SUBNODES COUNT="1">
<NODE TYPE="PLAYLIST" NAME="${playlistName}">
<PLAYLIST ENTRIES="${digests.length}" TYPE="LIST" UUID="generatedByTraktor">
${getNodePlaylistEntries(digests).join('')}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`

    return header +
        digests.map(digest => digest.rawData).join('') +
        footer
}
