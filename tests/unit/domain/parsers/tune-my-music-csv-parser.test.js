import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {TuneMyMusicCsvParser} from '../../../../src/js/domain/parsers/tune-my-music-csv-parser.js'
import {assertDigestedPlaylistsAreEqual} from '../../helpers/custom-asserts.js'
import {GENERIC_ARTIST_NAME, GENERIC_SONG_TITLE} from '../../helpers/builders/track/track-builder.js'

const tuneMyMusicCsvParser = suite("Tune My Music CSV parser")

function makeField(/** string */ field, /** string|number */ suffix) {
    return field + suffix
}

function makeTitle(/** string | number */ suffix) {
    return makeField(GENERIC_SONG_TITLE, suffix)
}

function makeArtist(/** string | number */ suffix) {
    return makeField(GENERIC_ARTIST_NAME, suffix)
}

function makeTrack(/** string | number */ suffix, playlistName = 'the-playlist') {
    return makeTitle(suffix) + ',' + makeArtist(suffix) + ',the-album,' + playlistName
}

function makePlaylist(/** string[] */ ...tracks) {
    return 'Track name, Artist name, Album, Playlist name, Type, ISRC' + '\n' + tracks.join('\n')
}

function makeDigest(/** number|string */ suffix) {
    return {artist: makeArtist(suffix), song: makeTitle(suffix), location: '', rawData: makeTrack(suffix)}
}

tuneMyMusicCsvParser('should know how to extract the tracks', () => {
    const song1 = makeTrack(1)
    const song2 = makeTrack(2)
    const playlist = makePlaylist(song1, song2)
    assert.equal(TuneMyMusicCsvParser.extractTracks(playlist)[0], song1)
    assert.equal(TuneMyMusicCsvParser.extractTracks(playlist)[1], song2)
})

tuneMyMusicCsvParser('should know how to extract the song title from track', () => {
    const track =  makeTrack(1)
    assert.equal(TuneMyMusicCsvParser.extractSong(track), makeTitle(1))
})

tuneMyMusicCsvParser('should know how to extract the artist from track when there is a single artist', () => {
    const track =  makeTrack(1)
    assert.equal(TuneMyMusicCsvParser.extractArtist(track), makeArtist(1))
})



tuneMyMusicCsvParser('should return the two digests when there are two items in the playlist', () => {
    const playlist = makePlaylist(makeTrack(1), makeTrack(2))
    assertDigestedPlaylistsAreEqual(
        TuneMyMusicCsvParser.parse(playlist),
        [makeDigest(1), makeDigest(2)])
})

tuneMyMusicCsvParser('should know how to extract the playlist name', () => {
    const playlistName = 'The Playlist'
    const playlist = makePlaylist(makeTrack(1, playlistName))
    assert.equal(TuneMyMusicCsvParser.extractPlaylistName(playlist), playlistName)
})

tuneMyMusicCsvParser.run()
