import {DataExtractor} from '../parser.js'

const lineSeparator = '\n'
const artistSongSeparator = ' , '
const multipleArtistsSeparator = ';'

export const byLineDataExtractor: DataExtractor = {
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
