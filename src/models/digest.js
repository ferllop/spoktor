export class Digest {
    constructor(artist, song, extraData = {}) {
        this.artist = artist
        this.song = song
        this.extraData = extraData
    }

    static isValid(digest) {
        return digest.artist.length > 0
            || digest.song.length > 0
    }

    toDto() {
        return {
            artist: this.artist,
            song: this.song,
            ...this.extraData,
        }
    }
}