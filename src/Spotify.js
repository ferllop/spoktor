export class Spotify {
    parse(html) {
        const tracks = this.#extractTracks(html)
        return tracks ? tracks.map(this.#createTrackEntry.bind(this)) : []
    }

    #extractTracks(htmlPlaylist) {
        const regex = /(<div.*?type="track".*?>.*?<\/div>)/gms
        return htmlPlaylist.match(regex)
    }

    #extractArtist(track) {
        const regex = /<a.*?href=".*?\/artist\/.*?">(.*?)<\/a>/s
        return track.match(regex)[1]
    }

    #extractSong(track) {
        const regex = /<a.*?href=".*?\/track\/.*?">(.*?)<\/a>/s
        return track.match(regex)[1]
    }

    #createTrackEntry(htmlTrack) {
        return {
            artist: this.#extractArtist(htmlTrack),
            song: this.#extractSong(htmlTrack),
        }
    }
}