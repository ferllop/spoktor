import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {Traktor} from '../src/Traktor.js'
import {TraktorPlaylistBuilder} from './traktor-collection-builder.js'
import {DOMParser} from 'xmldom'

const traktor2Json = suite('Traktor to JSON converter')

const parse = (xmlString) => {
    return new DOMParser()
        .parseFromString(xmlString, 'text/xml')
}

traktor2Json.before.each(context => {
    context.traktor = new Traktor({parse})
})

traktor2Json('should return an empty array when there are no tracks', ({traktor}) => {
    assert.equal(traktor.parse(''), [])
})

traktor2Json('should return a one item array when there is one track in the playlist', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(1).build()
    assert.equal(traktor.parse(playlist), [{artist: 'artist1', song: 'song1'}])
})

traktor2Json('should return a the item array when there are two coincidences', ({traktor}) => {
    const playlist = new TraktorPlaylistBuilder().withXtracks(2).build()
    assert.equal(traktor.parse(playlist), [{artist: 'artist1', song: 'song1'}, {artist: 'artist2', song: 'song2'}])
})

traktor2Json.run()



