import {TraktorTrackBuilder} from './traktor-track-builder'
import {TrackBuilder} from './track-builder'

export class DigestBuilder extends TrackBuilder<Digest> {
    rawData: string = ''

    static fromBuildingTraktorTrack(track: TraktorTrackBuilder) {
        return new DigestBuilder()
            .withSong(track.song ?? '')
            .withArtist(track.artist ?? '')
            .withRawData(track.build())
            .build()
    }

    withRawData(data: string) {
        this.rawData = data
        return this
    }

    build() {
        return {
            artist: this.artist,
            song: this.song,
            location: this.location,
            rawData: this.rawData,
        }
    }
}
