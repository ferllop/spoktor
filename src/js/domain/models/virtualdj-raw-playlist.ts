import {VirtualDjXmlParser} from '../parsers/virtualdj-xml-parser.js'
import { Digest } from './digest.js'

function renderFullFilePathFrom(rawTrack: string): string {
    return VirtualDjXmlParser.extractLocation(rawTrack)
}

function getNodePlaylistEntries(digests: Digest[]) {
    return digests.map(digest => {
        const filePath = renderFullFilePathFrom(digest.rawData)
        return `<Song>
<PRIMARYKEY TYPE="TRACK" KEY="${filePath}"></PRIMARYKEY>
</Song>`
    })
}

function generatePlaylistFrom(digests: Digest[]): string {
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
