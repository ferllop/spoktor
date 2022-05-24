import {Digest} from '../models/digest.js'
import {DigestList} from '../models/digest-list.js'
import {EmptyPlaylistError} from '../errors/empty-playlist-error.js'

/**
 *  @abstract
 */
export class PlaylistParser {
    parse(playlist) {
        if(playlist.length === 0) {
            throw new EmptyPlaylistError()
        }
        const tracks = this.extractTracks(playlist) ?? DigestList.EMPTY
        const digests = tracks.map(this.#createDigest.bind(this))
        return new DigestList(digests).getList()
    }

    #createDigest(track) {
        return new Digest(
            this.extractArtist(track),
            this.extractSong(track),
            track,
        )
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

    /**
     *  @abstract
     */
    extractPlaylistName(track) {
    }
}