import {EmptyPlaylistError} from '../errors/empty-playlist-error.js'
import {isValid} from '../models/digest.js'

/** @returns {Digest[]} */
export function parse(/**string */playlist, /** DataExtractor */ dataExtractor){
    if(playlist.length === 0) {
        throw new EmptyPlaylistError()
    }
    const tracks = dataExtractor.extractTracks(playlist) ?? []
    const createDigest = DigestCreator(dataExtractor)
    const digests = tracks.map(createDigest)
    return digests.filter(isValid)
}

/** @return {function(string): Digest} */
function DigestCreator(/** DataExtractor */ dataExtractor) {
    return (/** string */ track) => ({
        artist: dataExtractor.extractArtist(track),
        song: dataExtractor.extractSong(track),
        location: dataExtractor.extractLocation(track),
        rawData: track,
    })
}

export const PlaylistParser = {
    parse,
}
