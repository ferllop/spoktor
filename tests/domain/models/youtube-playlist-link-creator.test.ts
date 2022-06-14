import {suite} from 'uvu'
import * as assert from 'uvu/assert'
import {createLink, makePlaylistLinkWithVideos} from '../../../src/domain/models/youtube-playlist-link-creator'

const ytPlaylistCreator = suite('Youtube playlist link creator')

function makeVideoLink(id: string) {
    return 'https://www.youtube.com/watch?v=' + id
}

ytPlaylistCreator('should return a link to a playlist with one item', () => {
    const id = '12345678901'
    assert.equal(createLink(makeVideoLink(id)), makePlaylistLinkWithVideos(id))
})

ytPlaylistCreator('should return a link to a playlist with two items', () => {
    const ids = ['12345678901', 'abcdefghijk']
    const videoLinks = ids.map(makeVideoLink).join('\n')
    assert.equal(createLink(videoLinks), makePlaylistLinkWithVideos(...ids))
})

ytPlaylistCreator('should ignore next query parameters', () => {
    const id = '12345678901'
    const videoLink = makeVideoLink(id) + '&list=other-query-parameter'
    assert.equal(createLink(videoLink), makePlaylistLinkWithVideos(id))
})

ytPlaylistCreator.run()
