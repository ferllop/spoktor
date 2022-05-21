import {SpotifyTrackBuilder} from '../track/spotify-track-builder.js'
import {AbstractTrackListBuilder} from './abstract-track-list-builder.js'

export class SpotifyPlaylistBuilder extends AbstractTrackListBuilder {
    withXTracks(quantity, offset = 1) {
        return super.withXTracks(quantity, offset, new SpotifyTrackBuilder())
    }

    build() {
        return this.tracks.join('')
    }
}