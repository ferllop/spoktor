import {withXTracks as superWithXTracks} from './playlist-builder.js'
import {map} from 'ramda'
import {buildSpotifyHtmlTrack} from '../track/spotify-html-track-builder.js'

export function withXTracks(/** number */ quantity, /** number */ offset, /** Playlist */ playlist) {
    return superWithXTracks(quantity, offset, (track) => ({...track}), playlist)
}

export function buildSpotifyHtmlPlaylist(/** Playlist */ playlist) {
    return header(playlist.playlistName) + map(buildSpotifyHtmlTrack, playlist.tracks).join('') + footer
}

const header = (/** string */ playlistName) => `<!DOCTYPE html><html lang=en dir="ltr" class="mobile-web-player">
<head><meta charset="UTF-8">
<title>${playlistName ?? 'carnaval 2022 mama'} - playlist by ferllop | Spotify</title>
<meta name="description" content="Listen on Spotify: " />
<meta property="google" content="notranslate" />
<meta property="fb:app_id" content="174829003346" />
<meta property="og:title" content="${playlistName ?? 'carnaval 2022 mama'}" />
<meta property="og:description" content="ferllop · Playlist · 38 songs" />
<meta property="og:url" content="https://open.spotify.com/playlist/1W0X6U8GupQnU4xtMwfmys" />
</head><body>`

const footer = `</body></html>`
