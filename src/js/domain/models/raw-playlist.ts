import {selectParserFor} from '../parsers/parser-selector.js'
import { Digest } from './digest.js'

function digest(rawPlaylist: string): Digest[] {
    const parser = selectParserFor(rawPlaylist)
    return parser.parse(rawPlaylist)
}

function extractPlaylistName(playlist: string): string {
    const parser = selectParserFor(playlist)
    return parser.extractPlaylistName(playlist)
}

export const RawPlaylist = {
    digest,
    extractPlaylistName,
}
