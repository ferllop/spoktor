import { Digest } from "../../../../../src/js/spoktor/domain/digest.js"
import { aTrack, MinimalTrackData } from "./track-builder.js"

type RawDataCreator = (track: MinimalTrackData) => string

export const aDigest = (rawDataCreator: RawDataCreator) => toDigest(rawDataCreator)(aTrack)

export const toDigest = 
    (rawDataCreator: RawDataCreator) => (track: MinimalTrackData): Digest => 
    ({
        artist: track.artist, 
        song: track.song, 
        location: track.location, 
        rawData: rawDataCreator(track)})

export const withRawData = 
    (data: string) => (digest: Digest): Digest => 
    ({...digest, rawData: data})
