import {selectParserFor} from '../commands/parser-selector'
import {DigestedPlaylist} from './digested-playlist'

export type RawPlaylist = string

function digest(rawPlaylist: RawPlaylist): DigestedPlaylist {
    const parser = selectParserFor(rawPlaylist)
    return parser.parse(rawPlaylist)
}

export const RawPlaylist = {
    digest,
}
