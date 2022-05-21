import {SpotifyTrackBuilder} from './spotify-track-builder.js'
import {Digest} from '../../src/models/digest.js'
import {DigestList} from '../../src/models/digest-list.js'

export class SpotifyPlaylistBuilder {
    constructor() {
        this.quantity = 0
    }

    withXTracks(quantity) {
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

    toDigestList() {
        const digests = new Array(this.quantity)
            .fill(null)
            .map((_, index) => {
                const trackNumber = index + 1
                return new Digest(
                    'artist' + trackNumber,
                    'song' + trackNumber,
                    new SpotifyTrackBuilder()
                        .withArtist('artist' + trackNumber)
                        .withSong('song' + trackNumber)
                        .build())
            })
        return new DigestList(digests).getList()
    }
}