import {selectParserFor} from '../parsers/parser-selector.js'
import { Digest } from './digest.js'

export const parse = (rawPlaylist: string): Digest[] =>
    selectParserFor(rawPlaylist).parse(rawPlaylist)

export const extractPlaylistName = (playlist: string): string =>
    selectParserFor(playlist).extractPlaylistName(playlist)
