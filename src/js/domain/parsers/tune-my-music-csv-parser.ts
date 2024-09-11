import {DataExtractor, parse, PlaylistParser} from './playlist-parser.js'

const lineSeparator = '\n'
const fieldSeparator = ','

const dataExtractor: DataExtractor = {
    extractTracks(rawPlaylist) {
        return rawPlaylist.split(lineSeparator).slice(1)
    },

    extractArtist(track) {
        return (track.split(fieldSeparator)[1] ?? '')
    },

    extractSong(track) {
        return track.split(fieldSeparator)[0] ?? ''
    },

    extractLocation() {
        return 'csv'
    },

    extractPlaylistName(rawPlaylist) {
        return rawPlaylist.split(lineSeparator)[1]?.split(fieldSeparator)[3] ?? ''
    },
}

export const TuneMyMusicCsvParser: PlaylistParser = {
    parse: parse(dataExtractor),
    ...dataExtractor,
}
