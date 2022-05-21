import {SpotifyTrackBuilder} from './spotify-track-builder.js'

export class SpotifyPlaylistBuilder {
    constructor() {
        this.quantity = 0
    }

    withXtracks(quantity) {
        this.quantity = quantity
        return this
    }

    build() {
        return new Array(this.quantity)
            .fill(null)
            .map((_, index) => {
                    const trackNumber = index + 1
                    return new SpotifyTrackBuilder()
                        .withArtist('artist' + trackNumber)
                        .withSong('song' + trackNumber)
                        .build()
                })
            .join('')
    }
}