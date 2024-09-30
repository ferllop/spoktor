import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {EmptyPlaylistError} from '../../../../src/js/spoktor/errors/empty-playlist-error.js'
import {selectDataExtractor} from '../../../../src/js/spoktor/parser/data-extractor-selector.js'
import {tuneMyMusicCsvDataExtractor} from '../../../../src/js/spoktor/parser/data-extractors/tune-my-music-csv.js'
import {traktorXmlDataExtractor} from '../../../../src/js/spoktor/parser/data-extractors/traktor-xml.js'
import {spotifyTextDataExtractor} from '../../../../src/js/spoktor/parser/data-extractors/spotify-text.js'
import {spotifyHtmlDataExtractor} from '../../../../src/js/spoktor/parser/data-extractors/spotify-html.js'
import {toTraktorCollection} from '../../helpers/builders/list/traktor-collection-builder.js'
import {aPlaylist, mapTracks, withXTracks} from '../../helpers/builders/list/playlist-builder.js'
import {toSpotifyPlainTextPlaylist} from '../../helpers/builders/list/spotify-plain-text-playlist-builder.js'
import {toSpotifyHtmlPlaylist} from '../../helpers/builders/list/spotify-html-playlist-builder.js'
import { toTraktorTrack } from '../../helpers/builders/track/traktor-track-builder.js'
import { pipe } from '../../../../src/js/lib/fp.js'

const parserSelector = suite('Parser selector')

const somePlaylist = pipe(aPlaylist, withXTracks(3))

parserSelector('should return the parser to parse a traktor text playlist when is what is provided', () => {
    const traktorPlaylist = toTraktorCollection(mapTracks(toTraktorTrack)(somePlaylist))
    assert.equal(selectDataExtractor(traktorPlaylist), traktorXmlDataExtractor)
})

parserSelector('should return the parser to parse a text spotify playlist when is what is provided', () => {
    const spotifyTextPlaylist = toSpotifyPlainTextPlaylist(somePlaylist)
    assert.equal(selectDataExtractor(spotifyTextPlaylist), spotifyTextDataExtractor)
})

parserSelector('should return the parser to parse a html spotify playlist when is what is provided', () => {
    const spotifyHtmlPlaylist = toSpotifyHtmlPlaylist(somePlaylist)
    assert.equal(selectDataExtractor(spotifyHtmlPlaylist), spotifyHtmlDataExtractor)
})

parserSelector('should return the parser to parse a html spotify playlist when is what is provided', () => {
    const csvPlaylist = 'Track name, Artist name, Album, Playlist name'
    assert.equal(selectDataExtractor(csvPlaylist), tuneMyMusicCsvDataExtractor)
})

parserSelector('should throw EmptyPlaylistError when playlist is empty', () => {
    const emptyPlaylist = ''
    assert.throws(() => {
            selectDataExtractor(emptyPlaylist)},
        (error: unknown) => error instanceof EmptyPlaylistError)
})

parserSelector.run()
