import {DigestList} from '../models/digest-list'
import {EmptyPlaylistError} from '../errors/empty-playlist-error'

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
        return {
            artist: this.extractArtist(track),
            song: this.extractSong(track),
            rawData: track,
        }
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
