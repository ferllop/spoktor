import { PlaylistGenerator } from "../playlist-generator.js"

export const generatePlaylistFrom: PlaylistGenerator = playlistName => digests => 
`#PLAYLIST:${playlistName}
${digests.map(digest => digest.location).join('\n')}`

