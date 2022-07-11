import {suite} from 'uvu'
import {TraktorXmlParser} from '../../../src/js/domain/parsers/traktor-xml-parser.js'
import {assertDigestedPlaylistsAreEqual, assertStringsAreEqualIgnoringItsFormatting} from '../../helpers/custom-asserts.js'
import * as assert from 'uvu/assert'
import {
    aTraktorTrack,
    buildTraktorTrack,
    withDirectory,
    withFilename, withVolume,
} from '../../helpers/builders/track/traktor-track-builder.js'
import {head, pipe, prop} from 'ramda'
import {aTrack, withArtist, withoutArtists, withoutSong, withSong} from '../../helpers/builders/track/track-builder.js'
import {buildTraktorCollection, withXTracks} from '../../helpers/builders/list/traktor-collection-builder.js'
import {aPlaylist, withTrack} from '../../helpers/builders/list/playlist-builder.js'

const traktorXmlParser = suite('Traktor XML parser')

traktorXmlParser('should return an empty title when there is no title', () => {
    const track = withSong('', aTrack)
    const playlist = buildTraktorCollection(withTrack(track, aPlaylist))
    assert.equal(
        pipe(head, prop('song'))(TraktorXmlParser.parse(playlist)),
        '')
})

traktorXmlParser('should return an empty artist when artist is empty', () => {
    const track = withArtist('', aTrack)
    const playlist = buildTraktorCollection(withTrack(track, aPlaylist))
    assert.equal(
        pipe(head, prop('artist'))(TraktorXmlParser.parse(playlist)),
        '')})

traktorXmlParser('should return an empty artist when there is no artist field', () => {
    const track = withoutArtists(aTrack)
    const playlist = buildTraktorCollection(withTrack(track, aPlaylist))
    assert.equal(
        pipe(head, prop('artist'))(TraktorXmlParser.parse(playlist)),
        '')
})

traktorXmlParser('should return an empty song when there is no title field', () => {
    const track = withoutSong(aTrack)
    const playlist = buildTraktorCollection(withTrack(track, aPlaylist))
    assert.equal(
        pipe(head, prop('song'))(TraktorXmlParser.parse(playlist)),
        '')
})

traktorXmlParser('should return a one item array when there is one track in the playlist', () => {
    const playlist = buildTraktorCollection(withXTracks(1, 1, aPlaylist))
    const result = TraktorXmlParser.parse(playlist)
    assert.equal(result.length,1)
})

traktorXmlParser('should return a two items array when there are two coincidences', () => {
    const playlist = buildTraktorCollection(withXTracks(2, 1, aPlaylist))
    const result = TraktorXmlParser.parse(playlist)
    assert.equal(result.length,2)
})

traktorXmlParser('should ignore a track if it has neither artist nor song', () => {
    const track = pipe(withoutArtists, withoutSong)(aTrack)
    const playlist = buildTraktorCollection(withTrack(track, aPlaylist))
    assertDigestedPlaylistsAreEqual(TraktorXmlParser.parse(playlist),[])
})

traktorXmlParser('should include the raw data into the track digest', () => {
    const track= buildTraktorTrack(aTraktorTrack(aTrack))
    const playlist= buildTraktorCollection(withTrack(aTraktorTrack(aTrack), aPlaylist))
    assertStringsAreEqualIgnoringItsFormatting(TraktorXmlParser.parse(playlist)[0].rawData, track)
})

traktorXmlParser('should know how to extract the directory from a collection entry', () => {
    const directory = '/the-absolute/directory/path/'
    const track = buildTraktorTrack(withDirectory(directory, aTraktorTrack(aTrack)))
    assert.equal(TraktorXmlParser.extractDir(track), directory.replaceAll('/', '/:'))
})

traktorXmlParser('should know how to extract the filename from a collection entry', () => {
    const filename = 'this-is the_filename.mp3'
    const track = buildTraktorTrack(withFilename(filename, aTraktorTrack(aTrack)))
    assert.equal(TraktorXmlParser.extractFilename(track), filename)
})

traktorXmlParser('should know how to extract the volume from a collection entry', () => {
    const volume = 'C:'
    const track = buildTraktorTrack(withVolume(volume, aTraktorTrack(aTrack)))
    assert.equal(TraktorXmlParser.extractVolume(track), volume)
})

traktorXmlParser.run()
