import {SpotifyTrackBuilder} from '../track/spotify-track-builder.js'
import {AbstractTrackListBuilder} from './traktor-collection-builder.js'

export class SpotifyPlaylistBuilder extends AbstractTrackListBuilder {
    withXTracks(quantity) {
        this.tracks = this.tracks.concat(new Array(quantity)
            .fill(null)
            .map((_, index) => {
                const trackNumber = index + 1
                return new SpotifyTrackBuilder()
                    .withArtist('artist' + trackNumber)
                    .withSong('song' + trackNumber)
                    .build()
            }))
        return this
    }

    build() {
        return this.tracks.join('')
    }
}