import {TextTrackBuilder} from './text-track-builder'

export class SpotifyTextTrackBuilder extends TextTrackBuilder {
    override withArtist(artist: string) {
        return this.withArtists(artist)
    }

    withArtists(...artists: string[]) {
        this.artist = artists.map(artist =>
                artist + ' <https://open.spotify.com/artist/2wMcQIxzH2LYHJZNxo9FcN>'
        ).join(',\n')
        return this
    }

    build() {
        return `1

${this.song}
${this.artist}
album <https://open.spotify.com/album/28L7sCuuF8Zt6dW1FuZqRh>
3 days ago

3:30`
    }
}
