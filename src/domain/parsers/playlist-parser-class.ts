import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {Digest} from '../models/digest'
import {DigestedPlaylist} from '../models/digested-playlist'

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

function parse(playlist: string, DataExtractor: DataExtractor): Digest[] {
    if(playlist.length === 0) {
        throw new EmptyPlaylistError()
    }
    const tracks = DataExtractor.extractTracks(playlist) ?? DigestedPlaylist.EMPTY
    const createDigest = DigestCreator(DataExtractor)
    const digests = tracks.map(createDigest)
    return digests.filter(Digest.isValid)
}

function DigestCreator(DataExtractor: DataExtractor) {
    return (track: string) => ({
        artist: DataExtractor.extractArtist(track),
        song: DataExtractor.extractSong(track),
        location: DataExtractor.extractLocation(track),
        rawData: track,
    })
}

export const PlaylistParser = {
    parse,
}
