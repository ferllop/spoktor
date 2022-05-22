import {DigestBuilder} from '../track/digest-builder.js'
import {DigestList} from '../../../../src/domain/digest-list.js'
import {AbstractTrackListBuilder} from './abstract-track-list-builder.js'

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
        return new DigestList(this.tracks).getList()
    }
}