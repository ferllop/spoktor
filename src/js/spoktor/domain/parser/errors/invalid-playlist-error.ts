export class InvalidPlaylistError extends Error {
    constructor() {
        super('The provided playlist is unsupported')
    }
}