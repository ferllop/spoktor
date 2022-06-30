import {PlaylistParser} from './playlist-parser'

function parse(playlist) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

const lineSeparator = '\n'
const artistSongSeparator = ' , '
const multipleArtistsSeparator = ';'

/** @type {import().DataExtractor} */
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

/** @type {import().PlaylistParser } */
export const ArtistTitleByLineParser = {
    parse,
    ...dataExtractor,
}
