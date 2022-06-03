import {DigestBuilder} from '../track/digest-builder'
import {AbstractTrackListBuilder} from './abstract-track-list-builder'
import {DigestedPlaylist} from '../../../../src/domain/models/digested-playlist'

export class DigestListBuilder extends AbstractTrackListBuilder {
    withXTracks(quantity, trackRawDataBuilder, offset = 1) {
        this.tracks = this.tracks.concat(new Array(quantity)
            .fill(null)
            .map((_, index) => {
                const trackNumber = index + offset
                const artist = 'artist' + trackNumber
                const song = 'song' + trackNumber
                const builder = new DigestBuilder()
                    .withArtist(artist)
                    .withSong(song)
                    .withRawData(trackRawDataBuilder.withArtist(artist).withSong(song).build())
                return builder.build()
            }))
        return this
    }

    build() {
        return DigestedPlaylist.recordPosition(this.tracks)
    }
}
