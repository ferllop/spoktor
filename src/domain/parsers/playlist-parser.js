import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {Digest} from '../models/digest'
import {DigestedPlaylist} from '../models/digested-playlist'

/**
 *  @abstract
 */
export class PlaylistParser {
    /*
    * @returns {DigestedPlaylist}
     */
    parse(playlist) {
        if(playlist.length === 0) {
            throw new EmptyPlaylistError()
        }
        const tracks = this.extractTracks(playlist) ?? DigestedPlaylist.EMPTY
        const digests = tracks.map(this.#createDigest.bind(this))
        return digests.filter(Digest.isValid)
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
