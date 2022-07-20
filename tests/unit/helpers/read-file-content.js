import fs from 'fs'

export function readFileContent(/** string */ relativeFilepath, /** ImportMeta */ importMeta) {
    const absolutePath = new URL(relativeFilepath, importMeta.url).pathname
    return fs.readFileSync(absolutePath, 'utf8')
}
