import {Digest} from './digest.js'

export class DigestList {
    static EMPTY = []
    #indexedDigests

    constructor(digests) {
        this.#indexedDigests = digests
            .filter(Digest.isValid)
            .map(this.createItem.bind(this))
    }

    createItem(digest, index) {
        return {index, digest: digest}
    }

    getList() {
        return this.#indexedDigests
    }
}