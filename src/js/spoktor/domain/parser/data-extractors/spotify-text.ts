import {DataExtractor} from '../parser.js'

export const spotifyTextDataExtractor: DataExtractor = {
    extractTracks(rawPlaylist) {
        return TrackExtractor.extractFrom(rawPlaylist)
    },

    extractArtist(track) {
        return ArtistExtractor.extractFrom(track)
    },

    extractSong(track) {
        return track.split('\n')[2] ?? ''
    },

    extractLocation() {
        return 'spotify'
    },

    extractPlaylistName(rawPlaylist) {
        const arr = rawPlaylist.split('\n')
        const hashtagIndex = arr.findIndex(line => {
            const cleaned = line.replace(/\s/g, '')
            return cleaned === '#'
        })
        return arr[hashtagIndex - 5]?.trim() ?? ''
    },
}

const TrackExtractor = {
    extractFrom(playlist: string) {
        const tracks = this.separateTracks(playlist.replace(/\r/g, ''))
        return this.cleanTracks(tracks)
    },

    cleanTracks(tracks: string[]) {
        return tracks.map(track => track.replace(/\r/g, '').replace(/^\n/, '')).filter(track => track.length > 0)
    },

    separateTracks(playlist: string) {
        const headless = this.removeHead(playlist)
        const tailess = this.removeTail(headless)
        return tailess.split(/(?<=\d+:\d+)[\r\n]/)
    },

    removeHead(playlist: string) {
        const arr = playlist.split('\n')
        const index = arr.findIndex(line => {
            const cleaned = line.replace(/\s/g, '')
            return cleaned === '#'
        })
        return arr.slice(index + 5).join('\n')
    },

    removeTail(playlist: string) {
        const arr = playlist.split('\n').reverse()
        const tailIndex = arr.findIndex((_, index) => {
            return /^\d+:\d+$/.test(arr[index] ?? '')
        })
        return arr.slice(tailIndex).reverse().join('\n')
    },
}

const ArtistExtractor = {
    extractFrom(track: string) {
        const artist = this.extractArtist(track)
        return this.cleanArtist(artist)
    },

    extractArtist(track: string) {
        const headerless = this.removeHead(track, 3)
        const tailess = this.removeTail(headerless, 3)
        return this.removeAlbum(tailess)
    },

    removeHead(track: string, lines: number) {
        return track.split('\n').slice(lines).join('\n')
    },

    removeTail(track: string, lines: number) {
        return track.split('\n').reverse().slice(lines).reverse().join('\n')
    },

    removeAlbum(track: string) {
        const reversed = track.split('\n').reverse()
        const albumURLPosition = reversed.findIndex(line => line.includes('<http'))
        const isNextLineAlbumName = !reversed[albumURLPosition + 1]?.includes('<http')
        const albumless = reversed.slice(albumURLPosition + (isNextLineAlbumName ? 2 : 1))
        return albumless.reverse().join('\n')
    },

    cleanArtist(track: string) {
        return track.split(',')
            .map(line => line.replace(/<.*?>/g, ''))
            .filter(line => line.length > 0)
            .map(line => line.trim()
                .replace(/^,/, '')
                .replace(/,$/, '')
                .replace(/(?<=\w)\n(?=\w)/g, ' ')
                .trim())
            .join(', ')
    },
}
