import {AbstractTrackListBuilder} from './abstract-track-list-builder.js'
import {SpotifyHtmlTrackBuilder} from '../track/spotify-html-track-builder.js'

export class SpotifyHtmlPlaylistBuilder extends AbstractTrackListBuilder {
    withXTracks(quantity, offset = 1) {
        return super.withXTracks(quantity, offset, new SpotifyHtmlTrackBuilder())
    }

    build() {
        return this.tracks.join('')
    }
}