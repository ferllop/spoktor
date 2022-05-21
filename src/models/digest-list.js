import {Digest} from './digest.js'

export class DigestList {
    static EMPTY = []

    constructor(digests) {
        this.digests = digests
            .filter(Digest.isValid)
            .map(this.addDigest.bind(this))
    }

    addDigest(digest, index) {
        return {index, digest: digest}
    }

    getList() {
        return this.digests.map(
            item => ({index: item.index, ...item.digest.toDto()}))
    }
}