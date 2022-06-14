export function createLink(linkList: string) {
            const regex = /youtu(?:.*\/v\/|.*v=|\.be\/|.*?embed\/)([A-Za-z0-9_\-]{11})/
    const links = linkList
        .split('\n')
        .filter( line => regex.test(line))
        .filter( line => !line.includes('&list='))
        .map( line => {
            return line.match(regex)?.[1] ?? ''})
        .join(',')
    return 'https://www.youtube.com/watch_videos?video_ids=' + links
}
