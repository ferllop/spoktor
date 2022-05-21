/**
 * @abstract
 */

export class AbstractTrackListBuilder {
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
                    .withArtist('artist' + trackNumber)
                    .withSong('song' + trackNumber)
                    .build()
            }))
        return this
    }
}