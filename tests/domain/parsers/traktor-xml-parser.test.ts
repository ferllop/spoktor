import {suite} from 'uvu'
import {TraktorXmlParser} from '../../../src/domain/parsers/traktor-xml-parser'
import {TraktorCollectionBuilder} from '../../helpers/builders/list/traktor-collection-builder'
import {TraktorTrackBuilder} from '../../helpers/builders/track/traktor-track-builder'
import {DigestBuilder} from '../../helpers/builders/track/digest-builder'
import {DigestPlaylistBuilder} from '../../helpers/builders/list/digest-playlist-builder'
import {assertDigestedPlaylistsAreEqual, assertStringsAreEqualIgnoringItsFormatting} from '../../helpers/custom-asserts'
import * as assert from 'uvu/assert'

const traktorXmlParser = suite('Traktor XML parser')

traktorXmlParser('should return an empty title when there is no title', () => {
    const traktorTrack = new TraktorTrackBuilder().withArtist('artist1').withSong('')
    const playlist = new TraktorCollectionBuilder().withTrack(traktorTrack.build()).build()
    assertDigestedPlaylistsAreEqual(
        TraktorXmlParser.parse(playlist),
        new DigestPlaylistBuilder()
            .withTrack(DigestBuilder.fromBuildingTraktorTrack(traktorTrack)).build())
})

traktorXmlParser('should return an empty artist when artist is empty', () => {
    const track = new TraktorTrackBuilder().withArtist('').withSong('song1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestPlaylistBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestedPlaylistsAreEqual(TraktorXmlParser.parse(playlist), digestsList)
})

traktorXmlParser('should return an empty artist when there is no artist field', () => {
    const track = new TraktorTrackBuilder().withoutArtist().withSong('song1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestPlaylistBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestedPlaylistsAreEqual(TraktorXmlParser.parse(playlist), digestsList)
})

traktorXmlParser('should return an empty song when there is no title field', () => {
    const track = new TraktorTrackBuilder().withoutSong().withArtist('artist1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestPlaylistBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestedPlaylistsAreEqual(TraktorXmlParser.parse(playlist), digestsList)
})

traktorXmlParser('should return a one item array when there is one track in the playlist', () => {
    const playlist = new TraktorCollectionBuilder().withXTracks(1)
    assertDigestedPlaylistsAreEqual(
        TraktorXmlParser.parse(playlist.build()),
        new DigestPlaylistBuilder().withXTracks(1, 1, new TraktorTrackBuilder()).build())
})

traktorXmlParser('should return a two items array when there are two coincidences', () => {
    const playlist = new TraktorCollectionBuilder().withXTracks(2)
    assertDigestedPlaylistsAreEqual(
        TraktorXmlParser.parse(playlist.build()),
        new DigestPlaylistBuilder().withXTracks(2, 1, new TraktorTrackBuilder()).build())
})

traktorXmlParser('should ignore a track if it has neither artist nor song', () => {
    const track = new TraktorTrackBuilder().withoutArtist().withoutSong().build()
    const playlist = new TraktorCollectionBuilder().withTrack(track).build()
    assertDigestedPlaylistsAreEqual(TraktorXmlParser.parse(playlist),[])
})

traktorXmlParser('should include the raw data into the track digest', () => {
    const track = new TraktorTrackBuilder().build()
    const playlist = new TraktorCollectionBuilder().withTrack(track).build()
    assertStringsAreEqualIgnoringItsFormatting(TraktorXmlParser.parse(playlist)[0]!.rawData, track)
})

traktorXmlParser('should know how to extract the directory from a collection entry', () => {
    const directory = '/the-absolute/directory/path/'
    const track = new TraktorTrackBuilder().withDirectory(directory).build()
    assert.equal(TraktorXmlParser.extractDir(track), directory.replaceAll('/', '/:'))
})

traktorXmlParser('should know how to extract the filename from a collection entry', () => {
    const filename = 'this-is the_filename.mp3'
    const track = new TraktorTrackBuilder().withFilename(filename).build()
    assert.equal(TraktorXmlParser.extractFilename(track), filename)
})

traktorXmlParser('should know how to extract the volume from a collection entry', () => {
    const volume = 'C:'
    const track = new TraktorTrackBuilder().withVolume(volume).build()
    assert.equal(TraktorXmlParser.extractVolume(track), volume)
})

traktorXmlParser.run()
