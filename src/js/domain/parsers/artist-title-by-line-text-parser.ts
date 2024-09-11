import {DataExtractor, parse, PlaylistParser} from './playlist-parser.js'

const lineSeparator = '\n'
const artistSongSeparator = ' , '
const multipleArtistsSeparator = ';'

const dataExtractor: DataExtractor = {
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

export const ArtistTitleByLineParser: PlaylistParser = {
    parse: parse(dataExtractor),
    ...dataExtractor,
}
