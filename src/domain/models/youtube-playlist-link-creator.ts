const regex = /youtu(?:.*\/v\/|.*v=|\.be\/|.*?embed\/)([A-Za-z0-9_\-]{11})/

function pipe(value: any, ...functions: ((...param: any) => any)[]): any {
    const [nextFunction, ...rest] = functions
    if (nextFunction === undefined) {
        return value
    }
    return pipe(nextFunction(value), ...rest)
}

export function createLink(linkList: string) {
    const videoIds = pipe(
        linkList,
        splitByLine,
        getLinesContainingYoutubeLink,
        getIdsFromVideoLinks)
    return makePlaylistLinkWithVideos(...videoIds)
}

export function makePlaylistLinkWithVideos(...videos: string[]) {
    return 'https://www.youtube.com/watch_videos?video_ids=' + videos.join(',')
}

function splitByLine(multilineText: string): string[] {
    return multilineText.split('\n')
}

function getLinesContainingYoutubeLink(lines: string[]): string[] {
    return lines.filter( line => regex.test(line))
}

function getIdsFromVideoLinks(links: string[]) {
    return links.map( line => line.match(regex)?.[1] ?? '' )
}
