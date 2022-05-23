import fs from 'fs'

export function readFileContent(relativeFilepath, importMeta) {
    const absolutePath = new URL('samples/spotify-text-sample.txt', importMeta.url).pathname
    return fs.readFileSync(absolutePath, 'utf8')
}
