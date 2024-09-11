import { Digest } from "./digest.js"

export const generatePlaylistFrom = (digests: Digest[], playlistName: string): string => 
`#PLAYLIST:${playlistName}
${digests.map(digest => digest.location).join('\n')}`

