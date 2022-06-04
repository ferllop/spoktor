import {DigestBuilder} from '../track/digest-builder'
import {Digest} from '../../../../src/domain/models/digest'
import {TextTrackBuilder} from '../track/text-track-builder'
import {PlaylistBuilder} from './playlist-builder'

export class DigestPlaylistBuilder extends PlaylistBuilder<Digest, Digest[]> {

    override buildTrack(artist: string, song: string, trackBuilder: TextTrackBuilder): Digest {
        return new DigestBuilder()
            .withArtist(artist)
            .withSong(song)
            .withRawData(trackBuilder.withArtist(artist).withSong(song).build())
    }

    build() {
        return this.tracks
    }
}
