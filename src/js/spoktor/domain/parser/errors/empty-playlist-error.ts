export class EmptyPlaylistError extends Error {
    constructor() {
        super('A provided playlist is empty')
    }
}