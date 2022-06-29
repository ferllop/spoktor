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

function parse(playlist: string, dataExtractor: DataExtractor): Digest[] {
    if(playlist.length === 0) {
        throw new EmptyPlaylistError()
    }
    const tracks = dataExtractor.extractTracks(playlist) ?? DigestedPlaylist.EMPTY
    const createDigest = DigestCreator(dataExtractor)
    const digests = tracks.map(createDigest)
    return digests.filter(Digest.isValid)
}

function DigestCreator(dataExtractor: DataExtractor) {
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
