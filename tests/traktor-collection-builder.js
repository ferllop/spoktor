import {TraktorTrackBuilder} from './traktor-track-builder.js'

export class TraktorPlaylistBuilder {
    constructor() {
        this.quantity = 0
    }

    withXtracks(quantity) {
        this.quantity = quantity
        return this
    }

    build() {
        const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<COLLECTION ENTRIES="${this.quantity}">`
        const body = new Array(this.quantity).fill(null).map((_, index) => {
            const trackNumber = index + 1
            return new TraktorTrackBuilder()
                .withArtist('artist' + trackNumber)
                .withSong('song' + trackNumber)
                .build()
        })
        const footer = '</COLLECTION></NML>'
        return header + body + footer
    }
}