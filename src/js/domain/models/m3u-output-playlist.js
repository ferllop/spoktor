function generatePlaylistFrom(/** Digest[] */ digests, /** string */ playlistName) /** string */ {
    const header = `#PLAYLIST:${playlistName}\n`
    return header +
        digests.map(digest => digest.location).join('\n')
}

export const M3UOutputPlaylist = {
    generatePlaylistFrom,
}
