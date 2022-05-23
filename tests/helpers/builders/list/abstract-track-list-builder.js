/**
 * @abstract
 */

export class AbstractTrackListBuilder {
    static GENERIC_ARTIST_NAME = 'artist'
    static GENERIC_SONG_TITLE = 'song'

    constructor() {
        this.tracks = []
    }

    withoutTracks() {
        this.tracks = []
        return this
    }

    withTrack(track) {
        this.tracks = this.tracks.concat(track)
        return this
    }

    withXTracks(quantity, offset, trackBuilder) {
        this.tracks = this.tracks.concat(new Array(quantity)
            .fill(null)
            .map((_, index) => {
                const trackNumber = index + offset
                return trackBuilder
                    .withArtist(AbstractTrackListBuilder.GENERIC_ARTIST_NAME + trackNumber)
                    .withSong(AbstractTrackListBuilder.GENERIC_SONG_TITLE + trackNumber)
                    .build()
            }))
        return this
    }
}