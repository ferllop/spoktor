import {EmptyPlaylistError} from '../errors/empty-playlist-error.js'
import {isValid, Digest} from '../models/digest.js'

export type RawPlaylist = string

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

export function parse(playlist: RawPlaylist, dataExtractor: DataExtractor): Digest[] {
    if(playlist.length === 0) {
        throw new EmptyPlaylistError()
    }
    const tracks = dataExtractor.extractTracks(playlist) ?? []
    const createDigest = DigestCreator(dataExtractor)
    const digests = tracks.map(createDigest)
    return digests.filter(isValid)
}

function DigestCreator(dataExtractor: DataExtractor): (track: string) => Digest {
    return (track: string) => ({
        artist: dataExtractor.extractArtist(track),
        song: dataExtractor.extractSong(track),
        location: dataExtractor.extractLocation(track),
        rawData: track,
    })
}

export const PlaylistParser = {
    parse,
}
