import {VirtualDjXmlParser} from '../parsers/virtualdj-xml-parser'

function renderFullFilePathFrom(/** string */ rawTrack) {
    return VirtualDjXmlParser.extractLocation(rawTrack)
}

function getNodePlaylistEntries(/** Digest[] */ digests) {
    return digests.map(digest => {
        const filePath = renderFullFilePathFrom(digest.rawData)
        return `<Song>
<PRIMARYKEY TYPE="TRACK" KEY="${filePath}"></PRIMARYKEY>
</Song>`
    })
}

function generatePlaylistFrom(/** Digest[] */ digests) {
    return (
        `<?xml version="1.0" encoding="UTF-8"?>
            <VirtualFolder>
                ${getNodePlaylistEntries(digests).join('')}
            </VirtualFolder>`
    )
}

export const TraktorRawPlaylist = {
    renderFullFilePathFrom,
    generatePlaylistFrom,
}
