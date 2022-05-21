import {Traktor} from '../src/Traktor.js'
import {TraktorTrackBuilder} from './traktor-track-builder.js'

export class TrackDigestBuilder {
    constructor() {
        this.song = 'someSong'
        this.artist = 'someArtist'
    }

    static fromBuildingTraktorTrack(track) {
        return new TrackDigestBuilder()
            .withSong(track.song ?? '')
            .withArtist(track.artist ?? '')
            .build()
    }

    withSong(song) {
        this.song = song
        return this
    }

    withArtist(artist) {
        this.artist = artist
        return this
    }

    build() {
        return {
            artist: this.artist,
            song: this.song,
            traktorData: new TraktorTrackBuilder()
                .withArtist(this.artist)
                .withSong(this.song)
                .build()
        }
    }
}