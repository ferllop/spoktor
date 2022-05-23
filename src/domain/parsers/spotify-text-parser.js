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
}

class TrackExtractor {
    extractFrom(playlist) {
        const tracks = this.separateTracks(playlist)
        return this.cleanTracks(tracks)
    }

    cleanTracks(tracks) {
        return tracks.map(track => track.replace(/^\n/, '')).filter(track => track.length > 0)
    }

    separateTracks(playlist) {
        const headless = this.removeHead(playlist)
        const tailess = this.removeTail(headless)
        return tailess.split(/(?<=\d+:\d+)\n/)
    }

    removeHead(playlist) {
        const arr = playlist.split('\n')
        const index = arr.findIndex(line => line.startsWith('date added'))
        return arr.splice(index+1).join('\n')
    }

    removeTail(playlist) {
        const reversed = playlist.split('\n').reverse()
        const tailIndex = reversed.findIndex(line => line.startsWith('Find more'))
        return reversed.splice(tailIndex+1).reverse().join('\n')
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
        return track.split('\n').splice(lines).join('\n')
    }

    removeTail(track, lines) {
        return track.split('\n').reverse().splice(lines).reverse().join('\n')
    }

    removeAlbum(track) {
        const reversed = track.split('\n').reverse()
        const albumPosition = reversed.findIndex(line => line.includes('<http'))
        const albumless = reversed.splice(albumPosition+1)
        return albumless.reverse().join('\n')
    }

    cleanArtist(track) {
        return track.split('\n')
            .map(line => line.replace(/<.*?>/g, ''))
            .filter(line => line.length > 0)
            .map(line => line.trim()
                .replace(/^,/, '')
                .replace(/,$/, '')
                .trim())
            .join(', ')
    }
}