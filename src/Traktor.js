export class Traktor {
    parse(html) {
        const tracks = this.#extractTracks(html)
        return tracks
            ? tracks
                .map(this.#createTrackEntry.bind(this))
                .filter(this.#isTrack.bind(this))
            : []
    }

    #isTrack(trackEntry) {
        return trackEntry.artist.length > 0
        || trackEntry.song.length > 0
    }

    #extractTracks(htmlPlaylist) {
        const regex = /(<ENTRY.*?>.*?<\/ENTRY>)/gsm
        return htmlPlaylist.match(regex)
    }

    #extractArtist(track) {
        const regex = /<ENTRY.*?ARTIST="(.*?)".*?>/s
        return track.match(regex)?.[1] ?? ''
    }

    #extractSong(track) {
        const entryRegex = /<ENTRY(.*?)>/s
        const entry = track.match(entryRegex)[1]
        const titleRegex = /TITLE="(.*?)"/s
        return entry.match(titleRegex)?.[1] ?? ''
    }

    #createTrackEntry(htmlTrack) {
        return {
            artist: this.#extractArtist(htmlTrack),
            song: this.#extractSong(htmlTrack),
        }
    }
}
