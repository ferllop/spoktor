import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import { tuneMyMusicCsvDataExtractor } from '../../../../../src/js/spoktor/parser/data-extractors/tune-my-music-csv.js'
import {assertDigestedPlaylistsAreEqual} from '../../../helpers/custom-asserts.js'
import {GENERIC_ARTIST_NAME, GENERIC_SONG_TITLE} from '../../../helpers/builders/track/track-builder.js'
import { parse } from '../../../../../src/js/spoktor/parser/parser.js'

const tuneMyMusicCsvParser = suite("Tune My Music CSV parser")

function makeField(field: string, suffix: string|number) {
    return field + suffix
}

function makeTitle(suffix: string|number) {
    return makeField(GENERIC_SONG_TITLE, suffix)
}

function makeArtist(suffix: string|number) {
    return makeField(GENERIC_ARTIST_NAME, suffix)
}

function makeTrack(suffix: string|number, playlistName = 'the-playlist') {
    return makeTitle(suffix) + ',' + makeArtist(suffix) + ',the-album,' + playlistName
}

function makePlaylist(...tracks: string[]) {
    return 'Track name, Artist name, Album, Playlist name, Type, ISRC' + '\n' + tracks.join('\n')
}

function makeDigest(suffix: string|number) {
    return {artist: makeArtist(suffix), song: makeTitle(suffix), location: '', rawData: makeTrack(suffix)}
}

tuneMyMusicCsvParser('should know how to extract the tracks', () => {
    const song1 = makeTrack(1)
    const song2 = makeTrack(2)
    const playlist = makePlaylist(song1, song2)
    assert.equal(tuneMyMusicCsvDataExtractor.extractTracks(playlist)[0], song1)
    assert.equal(tuneMyMusicCsvDataExtractor.extractTracks(playlist)[1], song2)
})

tuneMyMusicCsvParser('should know how to extract the song title from track', () => {
    const track =  makeTrack(1)
    assert.equal(tuneMyMusicCsvDataExtractor.extractSong(track), makeTitle(1))
})

tuneMyMusicCsvParser('should know how to extract the artist from track when there is a single artist', () => {
    const track =  makeTrack(1)
    assert.equal(tuneMyMusicCsvDataExtractor.extractArtist(track), makeArtist(1))
})

tuneMyMusicCsvParser('should return the two digests when there are two items in the playlist', () => {
    const playlist = makePlaylist(makeTrack(1), makeTrack(2))
    assertDigestedPlaylistsAreEqual(
        parse(tuneMyMusicCsvDataExtractor)(playlist),
        [makeDigest(1), makeDigest(2)])
})

tuneMyMusicCsvParser('should know how to extract the playlist name', () => {
    const playlistName = 'The Playlist'
    const playlist = makePlaylist(makeTrack(1, playlistName))
    assert.equal(tuneMyMusicCsvDataExtractor.extractPlaylistName(playlist), playlistName)
})

tuneMyMusicCsvParser.run()
