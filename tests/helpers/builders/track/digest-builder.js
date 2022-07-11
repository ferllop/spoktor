/** @returns {Digest} */
export function aDigest(/** Track */ track) {
    return {
        ...track,
        rawData: '',
    }
}

/** @returns {Digest} */
export function withRawData(/** string */ data, /** Digest */ digest) {
    return {...digest, rawData: data}
}
