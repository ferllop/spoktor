import {Digest} from '../digest.js'

/**
 *  @abstract
 */
export class PlaylistParser {
    parse(playlist) {
        const tracks = this.extractTracks(playlist)
        return tracks
            ? tracks
                .map(this.#createDigest.bind(this))
                .filter(Digest.isValid)
                .map(this.#addIndex.bind(this))
            : []
    }

    #addIndex(track, index) {
        return {index, ...track}
    }

    #createDigest(track) {
        return new Digest(
            this.extractArtist(track),
            this.extractSong(track),
            this.computeExtraData(track),
        ).toDto()
    }

    computeExtraData(track) {
        return {}
    }

    /**
     *  @abstract
     */
    extractTracks(playlist) {
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