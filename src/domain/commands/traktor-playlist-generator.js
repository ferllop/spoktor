import {TraktorXmlParser} from '../parsers/traktor-xml-parser.js'

export class TraktorPlaylistGenerator {

    execute(digests, playlistName) {
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
${this.getNodePlaylistEntries(digests)}
</PLAYLIST>
</NODE>
</SUBNODES>
</NODE>
</PLAYLISTS>
<INDEXING></INDEXING>
</NML>`

        return header +
            digests.map(digest => digest.digest.rawData).join('') +
            footer
    }

    getNodePlaylistEntries(digests) {
        return digests.map(digest => {
            return `<ENTRY>
<PRIMARYKEY TYPE="TRACK" KEY="${this.renderFullPath(digest.digest.rawData)}"></PRIMARYKEY>
</ENTRY>`
        })
    }

    renderFullPath(track) {
        const traktorParser = new TraktorXmlParser()
        const volume = traktorParser.extractVolume(track)
        const directoryPath = traktorParser.extractDir(track)
        const filename = traktorParser.extractFilename(track)
        return volume + directoryPath + filename
    }
}