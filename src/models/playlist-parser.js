/**
 *  @abstract
 */
export class PlaylistParser {
    parse(playlist) {
        const tracks = this.extractTracks(playlist)
        return tracks
            ? tracks
                .map(this.#createDigest.bind(this))
                .filter(this.#isValidDigest.bind(this))
                .map(this.#addIndex.bind(this))
            : []
    }

    #addIndex(track, index) {
        return {index, ...track}
    }

    #createDigest(track) {
        return {
            artist: this.extractArtist(track),
            song: this.extractSong(track),
            ...this.computeExtraData(track),
        }
    }

    computeExtraData(track) {
        return {}
    }

    #isValidDigest(digest) {
        return digest.artist.length > 0
            || digest.song.length > 0
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