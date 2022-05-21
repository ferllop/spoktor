import {TrackDigestBuilder} from './track-digest-builder.js'

export class DigestPlaylistBuilder {
    constructor() {
        this.quantity = 0
    }

    withTracksQuantity(quantity) {
        this.quantity = quantity
        return this
    }

    build() {
        return new Array(this.quantity)
            .fill(null)
            .map((_, index) => {
                    const trackNumber = index + 1
                    const digest = new TrackDigestBuilder()
                        .withArtist('artist' + trackNumber)
                        .withSong('song' + trackNumber)
                        .build()
                    return {index, ...digest}
                })
    }
}