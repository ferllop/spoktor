import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {Digest} from '../models'

/** @returns {Digest[]} */
export function parse(/**string */playlist, /** DataExtractor */ dataExtractor){
    if(playlist.length === 0) {
        throw new EmptyPlaylistError()
    }
    const tracks = dataExtractor.extractTracks(playlist) ?? []
    const createDigest = DigestCreator(dataExtractor)
    const digests = tracks.map(createDigest)
    return digests.filter(Digest.isValid)
}

/** @return {function(string): Digest} */
function DigestCreator(/** DataExtractor */ dataExtractor) {
    return (/**string*/track) => ({
        artist: dataExtractor.extractArtist(track),
        song: dataExtractor.extractSong(track),
        location: dataExtractor.extractLocation(track),
        rawData: track,
    })
}

export const PlaylistParser = {
    parse,
}
