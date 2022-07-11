const regex = /youtu(?:.*\/v\/|.*v=|\.be\/|.*?embed\/)([A-Za-z0-9_\-]{11})/

export function pipe(value, /** : ((...param) => any)[] */ ...functions) {
    const [nextFunction, ...rest] = functions
    if (nextFunction === undefined) {
        return value
    }
    return pipe(nextFunction(value), ...rest)
}

export function createLink(/** string */ linkList) {
    const videoIds = pipe(
        linkList,
        splitByLine,
        getLinesContainingYoutubeLink,
        getIdsFromVideoLinks)
    return makePlaylistLinkWithVideos(...videoIds)
}

export function makePlaylistLinkWithVideos(/** string[] */ ...videos) {
    return 'https://www.youtube.com/watch_videos?video_ids=' + videos.join(',')
}

function splitByLine(/** string */ multilineText)/** string[] */ {
    return multilineText.split('\n')
}

function getLinesContainingYoutubeLink(/** string[] */ lines) /** string[] */ {
    return lines.filter( line => regex.test(line))
}

function getIdsFromVideoLinks(/** string[] */ links) {
    return links.map( line => line.match(regex)?.[1] ?? '' )
}
