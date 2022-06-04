import {selectParserFor} from '../parsers/parser-selector'
import {Digest} from './digest'

function digest(rawPlaylist: string): Digest[] {
    const parser = selectParserFor(rawPlaylist)
    return parser.parse(rawPlaylist)
}

function extractPlaylistName(playlist: string) {
    const parser = selectParserFor(playlist)
    return parser.extractPlaylistName(playlist)
}

export const RawPlaylist = {
    digest,
    extractPlaylistName,
}
