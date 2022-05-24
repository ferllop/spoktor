import {PlaylistParser} from './playlist-parser.js'

export class SpotifyTextParser extends PlaylistParser {
    extractTracks(playlist) {
        return new TrackExtractor().extractFrom(playlist)
    }

    extractArtist(track) {
        return new ArtistExtractor().extractFrom(track)
    }

    extractSong(track) {
        return track.split('\n')[2]
    }

    extractPlaylistName(playlist) {
        return playlist[1]
    }
}

class TrackExtractor {
    extractFrom(playlist) {
        const tracks = this.separateTracks(playlist.replace(/\r/g, ''))
        return this.cleanTracks(tracks)
    }

    cleanTracks(tracks) {
        return tracks.map(track => track.replace(/\r/g, '').replace(/^\n/, '')).filter(track => track.length > 0)
    }

    separateTracks(playlist) {
        const headless = this.removeHead(playlist)
        const tailess = this.removeTail(headless)
        return tailess.split(/(?<=\d+:\d+)[\r\n]/)
    }

    removeHead(playlist) {
        const arr = playlist.split('\n')
        const index = arr.findIndex(line => {
            const cleaned = line.replace(/\s/g, '')
            return cleaned === '#'
        })
        return arr.slice(index + 5).join('\n')
    }

    removeTail(playlist) {
        const arr = playlist.split('\n').reverse()
        const tailIndex = arr.findIndex((line, index) => {
            return /^\d+:\d+/.test(arr[index+2]) && /^[a-zA-Z]/.test(line)
        })
        return arr.slice(tailIndex+1).reverse().join('\n')
    }
}

class ArtistExtractor {
    extractFrom(track) {
        const artist = this.extractArtist(track)
        return this.cleanArtist(artist)
    }

    extractArtist(track) {
        const headerless = this.removeHead(track, 3)
        const tailess = this.removeTail(headerless, 3)
        return this.removeAlbum(tailess)
    }

    removeHead(track, lines) {
        return track.split('\n').slice(lines).join('\n')
    }

    removeTail(track, lines) {
        return track.split('\n').reverse().slice(lines).reverse().join('\n')
    }

    removeAlbum(track) {
        const reversed = track.split('\n').reverse()
        const albumURLPosition = reversed.findIndex(line => line.includes('<http'))
        const isNextLineAlbumName = ! reversed[albumURLPosition+1].includes('<http')
        const albumless = reversed.slice(albumURLPosition + (isNextLineAlbumName ? 2 : 1))
        return albumless.reverse().join('\n')
    }

    cleanArtist(track) {
        return track.split(',')
            .map(line => line.replace(/<.*?>/g, ''))
            .filter(line => line.length > 0)
            .map(line => line.trim()
                .replace(/^,/, '')
                .replace(/,$/, '')
                .replace(/(?<=\w)\n(?=\w)/g, ' ')
                .trim())
            .join(', ')
    }
}