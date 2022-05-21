import {Digest} from './digest.js'

export class DigestList {
    static EMPTY = []

    constructor(digests) {
        this.digests = digests
    }

    addIndex(digest, index) {
        return {index, ...digest}
    }

    getList() {
        return this.digests
            .filter(Digest.isValid)
            .map(this.addIndex.bind(this))
    }
}