import { Digest } from "../../../../../src/js/domain/models/digest.js"
import { Track } from "./track-builder.js"

export function aDigest(track: Track): Digest {
    return {
        ...track,
        rawData: '',
    }
}

export function withRawData(data: string, digest: Digest): Digest {
    return {...digest, rawData: data}
}
