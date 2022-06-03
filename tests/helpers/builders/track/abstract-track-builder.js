/**
 * @abstract
 */
import {AbstractTrackListBuilder} from '../list/abstract-track-list-builder'

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

    numberedWith(number) {
        this.withSong(AbstractTrackListBuilder.GENERIC_SONG_TITLE + number)
        this.withArtist(AbstractTrackListBuilder.GENERIC_ARTIST_NAME + number)
        return this
    }

    /**
     * @abstract
     */
    build() {
    }
}
