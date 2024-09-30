import { virtualdjXmlDataExtractor } from '../../parser/data-extractors/virtualdj-xml.js'
import { Digest } from '../../digest.js'
import { PlaylistGenerator } from '../playlist-generator.js'

export const renderFullFilePathFrom = virtualdjXmlDataExtractor.extractLocation

export const generatePlaylistFrom: PlaylistGenerator = digests => 
    `<?xml version="1.0" encoding="UTF-8"?>
        <VirtualFolder>
            ${digests.map(toEntry).join('')}
        </VirtualFolder>`

const toEntry = (digest: Digest) => 
    `<Song>
<PRIMARYKEY TYPE="TRACK" KEY="${renderFullFilePathFrom(digest.rawData)}"></PRIMARYKEY>
</Song>`
