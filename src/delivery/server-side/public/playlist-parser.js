function isValid(candidate) {
    return candidate.artist.length > 0
        || candidate.song.length > 0
}

function parse(playlist, dataExtractor) {
    if(playlist.length === 0) {
        throw new Error('A provided playlist is empty')
    }
    const tracks = dataExtractor.extractTracks(playlist) ?? []
    const createDigest = DigestCreator(dataExtractor)
    const digests = tracks.map(createDigest)
    return digests.filter(isValid)
}

function DigestCreator(dataExtractor) {
    return (track) => ({
        artist: dataExtractor.extractArtist(track),
        song: dataExtractor.extractSong(track),
        location: dataExtractor.extractLocation(track),
        rawData: track,
    })
}

export const PlaylistParser = {
    parse,
}
