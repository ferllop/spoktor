import {TraktorTrackBuilder} from './traktor-track-builder.js'

export class TraktorPlaylistBuilder {
    constructor() {
        this.tracks = []
    }

    withoutTracks() {
        this.tracks = []
        return this
    }

    withXtracks(quantity) {
        this.tracks = this.tracks.concat(new Array(quantity).fill(null).map((_, index) => {
            const trackNumber = index + 1
            return new TraktorTrackBuilder()
                .withArtist('artist' + trackNumber)
                .withSong('song' + trackNumber)
                .build()
        }))
        return this
    }

    withTrack(track) {
        this.tracks = this.tracks.concat(track)
        return this
    }

    build() {
        const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<COLLECTION ENTRIES="${this.tracks.length}">`
        const footer = '</COLLECTION></NML>'
        return header + this.tracks.join('') + footer
    }
}