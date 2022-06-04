import {TrackBuilder} from '../track/track-builder'
import {TextTrackBuilder} from '../track/text-track-builder'

export abstract class PlaylistBuilder<Track, Playlist> {
    tracks: Track[] = []
    playlistName = ''

    withPlaylistName(name: string) {
        this.playlistName = name
        return this
    }

    withoutTracks() {
        this.tracks = []
        return this
    }

    withTrack(track: Track) {
        this.tracks = this.tracks.concat(track)
        return this
    }

    withXTracks(quantity: number, offset: number, trackBuilder: TextTrackBuilder) {
        this.tracks = this.tracks.concat(new Array<Track|null>(quantity)
            .fill(null)
            .map((_, index) => {
                const trackNumber = index + offset
                return this.buildTrack(TrackBuilder.GENERIC_ARTIST_NAME + trackNumber,
                    TrackBuilder.GENERIC_SONG_TITLE + trackNumber, trackBuilder)
            }))
        return this
    }

    abstract buildTrack(artist: string, song: string, trackBuilder: TextTrackBuilder): Track
    abstract build(): Playlist
}
