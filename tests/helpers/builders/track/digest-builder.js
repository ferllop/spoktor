import {AbstractTrackBuilder} from './abstract-track-builder.js'

export class DigestBuilder extends AbstractTrackBuilder {
    constructor() {
        super()
        this.rawData = null
    }

    static fromBuildingTraktorTrack(track) {
        return new DigestBuilder()
            .withSong(track.song ?? '')
            .withArtist(track.artist ?? '')
            .withRawData(track.build())
            .build()
    }

    withRawData(data) {
        this.rawData = data
        return this
    }

    build() {
        return {
            artist: this.artist,
            song: this.song,
            rawData: this.rawData,
        }
    }
}
