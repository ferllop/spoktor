import {DataExtractor, PlaylistParser} from './playlist-parser-class'

function parse(playlist: string) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

const dataExtractor: DataExtractor = {
    extractTracks(collection: string) {
        const regex = /(<Song.*?>.*?<\/Song>)/gsm
        return collection.match(regex) ?? []
    },

    extractArtist(track: string) {
        const regex = /<Song.*?Author="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractSong(track: string) {
        const regex = /<Song.*?Title="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractLocation(track: string) {
        const regex = /FilePath="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractPlaylistName() {
        return ''
    },
}

export const VirtualDjXmlParser: PlaylistParser & typeof dataExtractor = {
    parse,
    ...dataExtractor,
}
