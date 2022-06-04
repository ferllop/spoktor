import {TraktorTrackBuilder} from '../track/traktor-track-builder'
import {TextPlayListBuilder} from './text-play-list-builder'

export class TraktorCollectionBuilder extends TextPlayListBuilder {
    override withXTracks(quantity: number, offset = 1) {
        return super.withXTracks(quantity, offset, new TraktorTrackBuilder())
    }

    build() {
        const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<COLLECTION ENTRIES="${this.tracks.length}">`
        const footer = '</COLLECTION></NML>'
        return header + this.tracks.join('') + footer
    }
}
