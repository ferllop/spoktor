import { PlaylistGenerator } from "../playlist-generator.js"

export const generatePlaylistFrom: PlaylistGenerator = (digests, playlistName): string => 
`#PLAYLIST:${playlistName}
${digests.map(digest => digest.location).join('\n')}`

