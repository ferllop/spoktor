import {Digest} from './digest'

export const M3UOutputPlaylist = {
    generatePlaylistFrom,
}

function generatePlaylistFrom(digests: Digest[], playlistName: string) {
    const header = `#PLAYLIST:${playlistName}\n`
    return header +
        digests.map(digest => digest.location).join('\n')
}
