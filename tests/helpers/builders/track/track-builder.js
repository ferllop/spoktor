/**
 * @template T
 */
export class TrackBuilder {

    static GENERIC_ARTIST_NAME = 'artist'
    static GENERIC_SONG_TITLE = 'song'

    song = 'someSong'
    artist = 'someArtist'
    location = ''

    withoutArtist() {
        this.artist = ''
        return this
    }

    withoutSong() {
        this.song = ''
        return this
    }

    withSong(/** string */ song) {
        this.song = song
        return this
    }

    withArtist(/** string */ artist) {
        this.artist = artist
        return this
    }

    numberedWith(/** number */ number) {
        this.withSong(TrackBuilder.GENERIC_SONG_TITLE + number)
        this.withArtist(TrackBuilder.GENERIC_ARTIST_NAME + number)
        return this
    }

    /** @abstract */
    build() /** T */ {
        throw new Error('must be implemented by subclass!');
    }
}
