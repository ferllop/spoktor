import {PlaylistBuilder} from './playlist-builder'
import {TrackBuilder} from '../track/track-builder'

export abstract class TextPlayListBuilder extends PlaylistBuilder<string, string> {
    override buildTrack(artist: string, song: string, trackBuilder: TrackBuilder<string>): string {
        return trackBuilder.withArtist(artist).withSong(song).build()
    }
}

