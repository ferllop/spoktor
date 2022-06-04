import {EmptyPlaylistError} from '../errors/empty-playlist-error'
import {Digest} from '../models/digest'
import {DigestedPlaylist} from '../models/digested-playlist'
import {RawPlaylist} from '../models/raw-playlist'

export type RawTrack = string
type Artist = string
type Song = string
type PlaylistName = string

export abstract class PlaylistParser {
    parse(playlist: RawPlaylist): Digest[] {
        if(playlist.length === 0) {
            throw new EmptyPlaylistError()
        }
        const tracks = this.extractTracks(playlist) ?? DigestedPlaylist.EMPTY
        const digests = tracks.map(this.createDigest.bind(this))
        return digests.filter(Digest.isValid)
    }

    private createDigest(track: RawTrack) {
        return {
            artist: this.extractArtist(track),
            song: this.extractSong(track),
            rawData: track,
        }
    }

    abstract extractTracks(playlist: RawPlaylist): RawTrack[]
    abstract extractArtist(track: RawTrack): Artist
    abstract extractSong(track: RawTrack): Song
    abstract extractPlaylistName(playlist: RawPlaylist): PlaylistName
}
