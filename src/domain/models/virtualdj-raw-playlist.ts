import {Digest} from './digest'
import {VirtualDjXmlParser} from '../parsers/virtualdj-xml-parser'

export const TraktorRawPlaylist = {
    renderFullFilePathFrom,
    generatePlaylistFrom,
}

function renderFullFilePathFrom(rawTrack: string) {
    return VirtualDjXmlParser.extractFilePath(rawTrack)
}

function getNodePlaylistEntries(digests: Digest[]) {
    return digests.map(digest => {
        const filePath = renderFullFilePathFrom(digest.rawData)
        return `<Song>
<PRIMARYKEY TYPE="TRACK" KEY="${filePath}"></PRIMARYKEY>
</Song>`
    })
}

function generatePlaylistFrom(digests: Digest[]) {
    return (
        `<?xml version="1.0" encoding="UTF-8"?>
            <VirtualFolder>
                ${getNodePlaylistEntries(digests).join('')}
            </VirtualFolder>`
    )
}
