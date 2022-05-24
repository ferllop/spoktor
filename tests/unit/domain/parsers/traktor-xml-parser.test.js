import {suite} from 'uvu'
import {TraktorXmlParser} from '../../../../src/domain/parsers/traktor-xml-parser.js'
import {TraktorCollectionBuilder} from '../../../helpers/builders/list/traktor-collection-builder.js'
import {TraktorTrackBuilder} from '../../../helpers/builders/track/traktor-track-builder.js'
import {DigestBuilder} from '../../../helpers/builders/track/digest-builder.js'
import {DigestListBuilder} from '../../../helpers/builders/list/digest-list-builder.js'
import {assertDigestListsAreEqual, assertRawDataAreEqual} from '../../../helpers/custom-asserts.js'

const traktorXmlParser = suite('Traktor XML parser')

traktorXmlParser.before.each(context => {
    context.traktor = new TraktorXmlParser()
})

traktorXmlParser('should return an empty title when there is no title', ({traktor}) => {
    const traktorTrack = new TraktorTrackBuilder().withArtist('artist1').withSong('')
    const playlist = new TraktorCollectionBuilder().withTrack(traktorTrack.build()).build()
    assertDigestListsAreEqual(
        traktor.parse(playlist),
        new DigestListBuilder()
            .withTrack(DigestBuilder.fromBuildingTraktorTrack(traktorTrack)).build())
})

traktorXmlParser('should return an empty artist when artist is empty', ({traktor}) => {
    const track = new TraktorTrackBuilder().withArtist('').withSong('song1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestListBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestListsAreEqual(traktor.parse(playlist), digestsList)
})

traktorXmlParser('should return an empty artist when there is no artist field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withSong('song1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestListBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestListsAreEqual(traktor.parse(playlist), digestsList)
})

traktorXmlParser('should return an empty song when there is no title field', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutSong().withArtist('artist1')
    const playlist = new TraktorCollectionBuilder().withTrack(track.build()).build()
    const digestsList = new DigestListBuilder().withTrack(DigestBuilder.fromBuildingTraktorTrack(track)).build()
    assertDigestListsAreEqual(traktor.parse(playlist), digestsList)
})

traktorXmlParser('should return a one item array when there is one track in the playlist', ({traktor}) => {
    const playlist = new TraktorCollectionBuilder().withXTracks(1)
    assertDigestListsAreEqual(
        traktor.parse(playlist.build()),
        new DigestListBuilder().withXTracks(1, new TraktorTrackBuilder()).build())
})

traktorXmlParser('should return a two items array when there are two coincidences', ({traktor}) => {
    const playlist = new TraktorCollectionBuilder().withXTracks(2)
    assertDigestListsAreEqual(
        traktor.parse(playlist.build()),
        new DigestListBuilder().withXTracks(2, new TraktorTrackBuilder()).build())
})

traktorXmlParser('should ignore a track if it has neither artist nor song', ({traktor}) => {
    const track = new TraktorTrackBuilder().withoutArtist().withoutSong().build()
    const playlist = new TraktorCollectionBuilder().withTrack(track).build()
    assertDigestListsAreEqual(traktor.parse(playlist),[])
})

traktorXmlParser('should include the raw data into the track digest', ({traktor}) => {
    const track = new TraktorTrackBuilder().build()
    const playlist = new TraktorCollectionBuilder().withTrack(track).build()
    assertRawDataAreEqual(traktor.parse(playlist)[0].digest.rawData, track)
})

traktorXmlParser.run()
