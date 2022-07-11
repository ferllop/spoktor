import {PlaylistParser} from './playlist-parser.js'

function parse(/**string*/ playlist) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

/** @return {string} */
function renderFullFilePathFrom(/** string */ rawTrack) {
    const volume = dataExtractor.extractVolume(rawTrack)
    const directoryPath = dataExtractor.extractDir(rawTrack)
    const filename = dataExtractor.extractFilename(rawTrack)
    return (volume + directoryPath + filename).replace(/\/:/g, '\\')
}

/** @type {typeof import('./index').DataExtractor} */
const dataExtractor = {
    extractTracks(collection) {
        const regex = /(<ENTRY.*?>.*?<\/ENTRY>)/gsm
        return collection.match(regex) ?? []
    },

    extractArtist(track) {
        const regex = /<ENTRY.*?ARTIST="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractSong(track) {
        /* We don't capture the title directly to be sure that we don't
           capture the TITLE existing into the album field */
        const entryRegex = /<ENTRY(.*?)>/s
        const entry = track.match(entryRegex)?.[1] ?? ''
        const titleRegex = /TITLE="(.*?)"/s
        return entry.match(titleRegex)?.[1] ?? ''
    },

    extractLocation(track) {
        return renderFullFilePathFrom(track)
    },

    extractDir(track) {
        const regex = /<LOCATION.*?DIR="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractFilename(track) {
        const regex = /<LOCATION.*?FILE="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractVolume(track) {
        const regex = /<LOCATION.*?VOLUME="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractPlaylistName() {
        return ''
    },
}

/** @type {import('./index').PlaylistParser} */
export const TraktorXmlParser = {
    parse,
    ...dataExtractor
}
