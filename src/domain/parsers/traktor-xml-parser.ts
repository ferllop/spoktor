

function parse(playlist: string) {
    return PlaylistParser.parse(playlist, dataExtractor)
}

function renderFullFilePathFrom(rawTrack: string) {
    const volume = dataExtractor.extractVolume(rawTrack)
    const directoryPath = dataExtractor.extractDir(rawTrack)
    const filename = dataExtractor.extractFilename(rawTrack)
    return (volume + directoryPath + filename).replaceAll('/:', '\\')
}

const dataExtractor = {
    extractTracks(collection: string) {
        const regex = /(<ENTRY.*?>.*?<\/ENTRY>)/gsm
        return collection.match(regex) ?? []
    },

    extractArtist(track: string) {
        const regex = /<ENTRY.*?ARTIST="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    },

    extractSong(track: string) {
        /* We don't capture the title directly to be sure that we don't
           capture the TITLE existing into the album field */
        const entryRegex = /<ENTRY(.*?)>/s
        const entry = track.match(entryRegex)?.[1] ?? ''
        const titleRegex = /TITLE="(.*?)"/s
        return entry.match(titleRegex)?.[1] ?? ''
    },

    extractLocation(track: string) {
        return renderFullFilePathFrom(track)
    },

    extractDir(track: string) {
        const regex = /<LOCATION.*?DIR="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractFilename(track: string) {
        const regex = /<LOCATION.*?FILE="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractVolume(track: string) {
        const regex = /<LOCATION.*?VOLUME="(.*?)"/s
        return track.match(regex)?.[1] ?? ''
    },

    extractPlaylistName() {
        return ''
    },
}

export const TraktorXmlParser: PlaylistParser & typeof dataExtractor = {
    parse,
    ...dataExtractor,
}
