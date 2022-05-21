/**
 *  @abstract
 */
export class TracksSetParser {
    parse(tracksSet) {
        const tracks = this.extractTracks(tracksSet)
        return tracks
            ? tracks
                .map(this.#createTrackEntry.bind(this))
                .filter(this.#isTrack.bind(this))
            : []
    }

    #createTrackEntry(track) {
        return {
            artist: this.extractArtist(track),
            song: this.extractSong(track),
            ...this.computeExtraData(track),
        }
    }

    computeExtraData(track) {
        return {}
    }

    #isTrack(trackEntry) {
        return trackEntry.artist.length > 0
            || trackEntry.song.length > 0
    }

    /**
     *  @abstract
     */
    extractTracks(tracksSet) {
    }

    /**
     *  @abstract
     */
    extractArtist(track) {
    }

    /**
     *  @abstract
     */
    extractSong(track) {
    }
}