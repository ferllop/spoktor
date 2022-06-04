import {suite} from 'uvu'
import {TraktorXmlParser} from '../../../src/domain/parsers/traktor-xml-parser'
import {TraktorCollectionBuilder} from '../../helpers/builders/list/traktor-collection-builder'
import {TraktorTrackBuilder} from '../../helpers/builders/track/traktor-track-builder'
import {DigestBuilder} from '../../helpers/builders/track/digest-builder'
import {DigestPlaylistBuilder} from '../../helpers/builders/list/digest-playlist-builder'
import {assertDigestedPlaylistsAreEqual, assertStringsAreEqualIgnoringItsFormatting} from '../../helpers/custom-asserts'
import * as assert from 'uvu/assert'

type Context = { traktor: TraktorXmlParser }
const traktorXmlParser = suite<Context>('Traktor XML parser')

traktorXmlParser.before.each(context => {
    context.traktor = new TraktorXmlParser()
})

traktorXmlParser('should return an empty title when there is no title', ({traktor}) => {
    const traktorTrack = new TraktorTrackBuilder().withArtist('artist1').withSong('')
    const playlist = new TraktorCollectionBuilder().withTrack(traktorTrack.build()).build()
    assertDigestedPlaylistsAreEqual(
        traktor.parse(playlist),
        new DigestPlaylistBuilder()
            .withTrack(DigestBuilder.fromBuildingTraktorTrack(traktorTrack)).build())
})

traktorXmlParser('should return an empty artist when artist is empty', ({traktor}) => {
    const track = new TraktorTrackBuilder().withArtist('').withSong('song1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestPlaylistBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestedPlaylistsAreEqual(traktor.parse(playlist), digestsList)
})

traktorXmlParser('should return an empty artist when there is no artist field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withSong('song1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestPlaylistBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestedPlaylistsAreEqual(traktor.parse(playlist), digestsList)
})

traktorXmlParser('should return an empty song when there is no title field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutSong().withArtist('artist1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestPlaylistBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestedPlaylistsAreEqual(traktor.parse(playlist), digestsList)
})

traktorXmlParser('should return a one item array when there is one track in the playlist', ({traktor}) => {
    const playlist = new TraktorCollectionBuilder().withXTracks(1)
    assertDigestedPlaylistsAreEqual(
        traktor.parse(playlist.build()),
        new DigestPlaylistBuilder().withXTracks(1, 1, new TraktorTrackBuilder()).build())
})

traktorXmlParser('should return a two items array when there are two coincidences', ({traktor}) => {
    const playlist = new TraktorCollectionBuilder().withXTracks(2)
    assertDigestedPlaylistsAreEqual(
        traktor.parse(playlist.build()),
        new DigestPlaylistBuilder().withXTracks(2, 1, new TraktorTrackBuilder()).build())
})

traktorXmlParser('should ignore a track if it has neither artist nor song', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withoutSong().build()
    const playlist = new TraktorCollectionBuilder().withTrack(track).build()
    assertDigestedPlaylistsAreEqual(traktor.parse(playlist),[])
})

traktorXmlParser('should include the raw data into the track digest', ({traktor}) => {
    const track = new TraktorTrackBuilder().build()
    const playlist = new TraktorCollectionBuilder().withTrack(track).build()
    assertStringsAreEqualIgnoringItsFormatting(traktor.parse(playlist)[0]!.rawData, track)
})

traktorXmlParser('should know how to extract the directory from a collection entry', ({traktor}) => {
    const directory = '/the-absolute/directory/path/'
    const track = new TraktorTrackBuilder().withDirectory(directory).build()
    assert.equal(traktor.extractDir(track), directory.replaceAll('/', '/:'))
})

traktorXmlParser('should know how to extract the filename from a collection entry', ({traktor}) => {
    const filename = 'this-is the_filename.mp3'
    const track = new TraktorTrackBuilder().withFilename(filename).build()
    assert.equal(traktor.extractFilename(track), filename)
})

traktorXmlParser('should know how to extract the volume from a collection entry', ({traktor}) => {
    const volume = 'C:'
    const track = new TraktorTrackBuilder().withVolume(volume).build()
    assert.equal(traktor.extractVolume(track), volume)
})

traktorXmlParser.run()