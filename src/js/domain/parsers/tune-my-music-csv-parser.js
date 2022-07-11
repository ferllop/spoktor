import {PlaylistParser} from './playlist-parser.js'

function parse(playlist) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

const lineSeparator = '\n'
const fieldSeparator = ','

/** @type {import('index').DataExtractor} */
const dataExtractor = {
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

/** @type {import('index').PlaylistParser } */
export const TuneMyMusicCsvParser = {
    parse,
    ...dataExtractor,
}
