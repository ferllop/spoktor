import { Digest } from "../digest.js";

export type PlaylistGenerator = (digests: Digest[], playlistName: string) => string