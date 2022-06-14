import {PlaylistParser} from './playlist-parser-class'

function parse(playlist: string) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

const lineSeparator = '\n'
const fieldSeparator = ','

const dataExtractor = {
    extractTracks(rawPlaylist: string) {
        return rawPlaylist.split(lineSeparator).slice(1)
    },

    extractArtist(track: string) {
        return (track.split(fieldSeparator)[1] ?? '')
    },

    extractSong(track: string) {
        return track.split(fieldSeparator)[0] ?? ''
    },

    extractPlaylistName(rawPlaylist: string) {
        return rawPlaylist.split(lineSeparator)[1]?.split(fieldSeparator)[3] ?? ''
    },
}

export const TuneMyMusicCsvParser: PlaylistParser = {
    parse,
    ...dataExtractor,
}
