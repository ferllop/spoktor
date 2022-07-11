import {PlaylistParser} from './playlist-parser.js'

/** @typedef {import('./index').DataExtractor} DataExtractor*/

function parse(playlist) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

const lineSeparator = '\n'
const artistSongSeparator = ' , '
const multipleArtistsSeparator = ';'

/** @type DataExtractor */
const dataExtractor = {
    extractTracks(rawPlaylist) {
        return rawPlaylist.split(lineSeparator).slice(1)
    },

    extractArtist(track) {
        return (track.split(artistSongSeparator)[0] ?? '')
            .replaceAll(multipleArtistsSeparator, ',')
    },

    extractLocation() {
        return 'unknown'
    },

    extractSong(track) {
        return track.split(artistSongSeparator)[1] ?? ''
    },

    extractPlaylistName() {
        return ''
    },
}

/** @type {import('index').PlaylistParser } */
export const ArtistTitleByLineParser = {
    parse,
    ...dataExtractor,
}
