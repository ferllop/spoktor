import {suite} from 'uvu'
import {extractDir, extractFilename, extractVolume, traktorXmlDataExtractor} from '../../../../../src/js/spoktor/parser/data-extractors/traktor-xml.js'
import {assertDigestedPlaylistsAreEqual, assertStringsAreEqualIgnoringItsFormatting} from '../../../helpers/custom-asserts.js'
import * as assert from 'uvu/assert'
import {
    toTraktorTrack,
    toTraktorEntry,
    withDirectory,
    withFilename, withVolume,
} from '../../../helpers/builders/track/traktor-track-builder.js'
import {aTrack, withArtist, withoutArtists, withoutSong, withSong} from '../../../helpers/builders/track/track-builder.js'
import {toTraktorCollection} from '../../../helpers/builders/list/traktor-collection-builder.js'
import {aPlaylist, mapTracks, withTracks, withXTracks} from '../../../helpers/builders/list/playlist-builder.js'
import { prop } from '../../../../fp.js'
import { pipe } from '../../../../../src/js/lib/fp.js'
import { parse } from '../../../../../src/js/spoktor/parser/playlist-parser.js'

const traktorXmlParser = suite('Traktor XML parser')
const sut = parse(traktorXmlDataExtractor)

traktorXmlParser('should return an empty title when there is no title', () => {
    const track = withSong('')(aTrack)
    const playlist = toTraktorCollection(mapTracks(toTraktorTrack)(withTracks([track])(aPlaylist)))
    assert.equal(
        pipe(parse(traktorXmlDataExtractor)(playlist)[0], prop('song')),
        '')
})

traktorXmlParser('should return an empty artist when artist is empty', () => {
    const track = withArtist('')(aTrack)
    const playlist = toTraktorCollection(mapTracks(toTraktorTrack)(withTracks([track])(aPlaylist)))
    assert.equal(
        pipe(sut(playlist)[0], prop('artist')),
        '')})

traktorXmlParser('should return an empty artist when there is no artist field', () => {
    const track = withoutArtists(aTrack)
    const playlist = toTraktorCollection(mapTracks(toTraktorTrack)(withTracks([track])(aPlaylist)))
    assert.equal(
        pipe(sut(playlist)[0], prop('artist')),
        '')
})

traktorXmlParser('should return an empty song when there is no title field', () => {
    const track = withoutSong(aTrack)
    const playlist = toTraktorCollection(mapTracks(toTraktorTrack)(withTracks([track])(aPlaylist)))
    assert.equal(
        pipe(sut(playlist)[0], prop('song')),
        '')
})

traktorXmlParser('should return a one item array when there is one track in the playlist', () => {
    const playlist = toTraktorCollection(mapTracks(toTraktorTrack)(withXTracks(1)(aPlaylist)))
    const result = sut(playlist)
    assert.equal(result.length,1)
})

traktorXmlParser('should return a two items array when there are two coincidences', () => {
    const playlist = toTraktorCollection(mapTracks(toTraktorTrack)(withXTracks(2)(aPlaylist)))
    const result = sut(playlist)
    assert.equal(result.length,2)
})

traktorXmlParser('should ignore a track if it has neither artist nor song', () => {
    const track = pipe(aTrack, withoutArtists, withoutSong)
    const playlist = toTraktorCollection(pipe(aPlaylist, withTracks([track]), mapTracks(toTraktorTrack)))
    assertDigestedPlaylistsAreEqual(sut(playlist),[])
})

traktorXmlParser('should include the raw data into the track digest', () => {
    const playlist = toTraktorCollection(mapTracks(toTraktorTrack)(withTracks([aTrack])(aPlaylist)))
    assertStringsAreEqualIgnoringItsFormatting(
        sut(playlist)[0].rawData, 
        toTraktorEntry(toTraktorTrack(aTrack)))
})

traktorXmlParser('should know how to extract the directory from a collection entry', () => {
    const directory = '/the-absolute/directory/path/'
    const track = withDirectory(directory)(toTraktorTrack(aTrack))
    assert.equal(extractDir(toTraktorEntry(track)), directory.replaceAll('/', '/:'))
})

traktorXmlParser('should know how to extract the filename from a collection entry', () => {
    const filename = 'this-is the_filename.mp3'
    const track = withFilename(filename)(toTraktorTrack(aTrack))
    assert.equal(extractFilename(toTraktorEntry(track)), filename)
})

traktorXmlParser('should know how to extract the volume from a collection entry', () => {
    const volume = 'C:'
    const track = withVolume(volume)(toTraktorTrack(aTrack))
    assert.equal(extractVolume(toTraktorEntry(track)), volume)
})

traktorXmlParser.run()
