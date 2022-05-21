import {DigestBuilder} from './digest-builder.js'
import {DigestList} from '../../src/models/digest-list.js'

export class DigestListBuilder {
    constructor() {
        this.digests = []
    }

    withXTracks(quantity, trackRawDataBuilder) {
        this.digests = this.digests.concat(new Array(quantity)
            .fill(null)
            .map((_, index) => {
                const trackNumber = index + 1
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

    withDigest(digest) {
        this.digests = this.digests.concat(digest)
        return this
    }

    build() {
        return new DigestList(this.digests).getList()
    }
}