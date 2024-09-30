import { virtualdjXmlDataExtractor } from '../parsers/virtualdj-xml-parser.js'
import { Digest } from './digest.js'

export const renderFullFilePathFrom = virtualdjXmlDataExtractor.extractLocation

export const generatePlaylistFrom = (digests: Digest[]): string => 
    `<?xml version="1.0" encoding="UTF-8"?>
        <VirtualFolder>
            ${digests.map(toEntry).join('')}
        </VirtualFolder>`

const toEntry = (digest: Digest) => 
    `<Song>
<PRIMARYKEY TYPE="TRACK" KEY="${renderFullFilePathFrom(digest.rawData)}"></PRIMARYKEY>
</Song>`
