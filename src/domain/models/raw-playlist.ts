import {selectParserFor} from '../parsers/parser-selector'
import {Digest} from './digest'

export type RawPlaylist = string

function digest(rawPlaylist: RawPlaylist): Digest[] {
    const parser = selectParserFor(rawPlaylist)
    return parser.parse(rawPlaylist)
}

function extractPlaylistName(playlist: RawPlaylist) {
    const parser = selectParserFor(playlist)
    return parser.extractPlaylistName(playlist)
}

export const RawPlaylist = {
    digest,
    extractPlaylistName,
}
