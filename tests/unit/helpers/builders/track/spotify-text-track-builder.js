export function buildSpotifyTextTrack(/** Track */ track) {
    const artists = track.artist.split(',')
        .map(artist => artist + ' <https://open.spotify.com/artist/2wMcQIxzH2LYHJZNxo9FcN>')
        .join(',\n')

    return `1

${track.song}
${artists}
album <https://open.spotify.com/album/28L7sCuuF8Zt6dW1FuZqRh>
3 days ago

3:30`
}

