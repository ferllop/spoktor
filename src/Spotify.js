export class Spotify {

    constructor(parser) {
        this.parser = parser
    }

    parse(html) {
        if (html.length === 0) {
            return []
        }
        const tracks = this.#extractTracks(html)
        return tracks.map(this.#createTrackEntry.bind(this))
    }

    #extractTracks(htmlPlaylist) {
        const document = this.parser.parse(htmlPlaylist)
        return document.querySelectorAll('div[type="track"]')
    }

    #extractArtist(track) {
        return track.querySelector('a[href*="/artist/"]').innerText
    }

    #extractSong(track) {
        return track.querySelector('a[href*="/track/"]').innerText
    }

    #createTrackEntry(htmlTrack) {
        return {
            artist: this.#extractArtist(htmlTrack),
            song: this.#extractSong(htmlTrack),
        }
    }
}
