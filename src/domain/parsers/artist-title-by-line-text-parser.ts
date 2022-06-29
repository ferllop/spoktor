

function parse(playlist: string) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

const lineSeparator = '\n'
const artistSongSeparator = ' , '
const multipleArtistsSeparator = ';'

const dataExtractor = {
    extractTracks(rawPlaylist: string) {
        return rawPlaylist.split(lineSeparator).slice(1)
    },

    extractArtist(track: string) {
        return (track.split(artistSongSeparator)[0] ?? '')
            .replaceAll(multipleArtistsSeparator, ',')
    },

    extractLocation() {
        return 'unknown'
    },

    extractSong(track: string) {
        return track.split(artistSongSeparator)[1] ?? ''
    },

    extractPlaylistName() {
        return ''
    },
}

export const ArtistTitleByLineParser: PlaylistParser = {
    parse,
    ...dataExtractor,
}
