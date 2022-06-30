import {selectParserFor} from '../parsers/parser-selector'

function digest(/** string */ rawPlaylist) /** Digest[] */ {
    const parser = selectParserFor(rawPlaylist)
    return parser.parse(rawPlaylist)
}

function extractPlaylistName(/** string */ playlist) /** string */ {
    const parser = selectParserFor(playlist)
    return parser.extractPlaylistName(playlist)
}

export const RawPlaylist = {
    digest,
    extractPlaylistName,
}
