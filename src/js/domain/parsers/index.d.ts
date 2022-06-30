import {Digest} from '../models'

export type PlaylistParser = {
    parse: (playlist: string) => Digest[]
} & DataExtractor

export type DataExtractor = {
    extractTracks: (playlist: string) => string[]
    extractArtist: (track: string) => string
    extractSong: (track: string) => string
    extractLocation: (track: string) => string
    extractPlaylistName: (playlist: string) => string
}

export type ParserSelector = (rawPlaylist: string) => PlaylistParser
