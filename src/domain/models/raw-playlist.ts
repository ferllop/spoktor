import {selectParserFor} from '../commands/parser-selector'

type RawPlaylist = string

function digest(rawPlaylist: RawPlaylist) {
    const parser = selectParserFor(rawPlaylist)
    return parser.parse(rawPlaylist)
}

export const RawPlaylist = {
    digest,
}
