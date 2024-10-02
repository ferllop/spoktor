import { Digest } from "../digest.js";

export type PlaylistGenerator = (playlistName: string) => (digests: Digest[]) => string