import { Digest } from "./digest.js"

function generatePlaylistFrom(digests: Digest[], playlistName: string): string {
    const header = `#PLAYLIST:${playlistName}\n`
    return header +
        digests.map(digest => digest.location).join('\n')
}

export const M3UOutputPlaylist = {
    generatePlaylistFrom,
}
