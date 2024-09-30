import { pipe } from "../../lib/fp.js"

const regex = /youtu(?:.*\/v\/|.*v=|\.be\/|.*?embed\/)([A-Za-z0-9_\-]{11})/

export function createLink(linkList: string): string {
    const videoIds = pipe(
        linkList,
        splitByLine,
        getLinesContainingYoutubeLink,
        getIdsFromVideoLinks)
    return makePlaylistLinkWithVideos(...videoIds)
}

export function makePlaylistLinkWithVideos(...videos: string[]): string {
    return 'https://www.youtube.com/watch_videos?video_ids=' + videos.join(',')
}

function splitByLine(multilineText: string): string[] {
    return multilineText.split('\n')
}

function getLinesContainingYoutubeLink(lines: string[]): string[] {
    return lines.filter( line => regex.test(line))
}

function getIdsFromVideoLinks(links: string[]): string[] {
    return links.map( line => line.match(regex)?.[1] ?? '' )
}