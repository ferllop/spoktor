export class Digest {
    constructor(artist, song, rawData) {
        this.artist = artist
        this.song = song
        this.rawData = rawData
    }

    static isValid(digest) {
        return digest.artist.length > 0
            || digest.song.length > 0
    }

    toDto() {
        return {
            artist: this.artist,
            song: this.song,
            rawData: this.rawData,
        }
    }
}