/**
 * @abstract
 */
export class AbstractTrackBuilder {
    constructor() {
        this.song = 'someSong'
        this.artist = 'someArtist'
    }

    withSong(song) {
        this.song = song
        return this
    }

    withArtist(artist) {
        this.artist = artist
        return this
    }

    /**
     * @abstract
     */
    build() {
    }
}