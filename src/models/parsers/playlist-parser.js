import {Digest} from '../digest.js'
import {DigestList} from '../digest-list.js'

/**
 *  @abstract
 */
export class PlaylistParser {
    parse(playlist) {
        const tracks = this.extractTracks(playlist) ?? DigestList.EMPTY
        const digests = tracks.map(this.#createDigest.bind(this))
        return new DigestList(digests).getList()
    }

    #createDigest(track) {
        return new Digest(
            this.extractArtist(track),
            this.extractSong(track),
            this.computeExtraData(track),
        )
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