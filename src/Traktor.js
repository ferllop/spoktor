export class Traktor {

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
        const result = document.getElementsByTagName('ENTRY')
        return Array.from(result)
    }

    #extractArtist(track) {
        return track.getAttribute('ARTIST')
    }

    #extractSong(track) {
        return track.getAttribute('TITLE')
    }

    #createTrackEntry(htmlTrack) {
        return {
            artist: this.#extractArtist(htmlTrack),
            song: this.#extractSong(htmlTrack),
        }
    }
}
