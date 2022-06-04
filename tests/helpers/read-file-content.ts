import fs from 'fs'

export function readFileContent(relativeFilepath: string, importMeta: ImportMeta) {
    const absolutePath = new URL(relativeFilepath, importMeta.url).pathname
    return fs.readFileSync(absolutePath, 'utf8')
}
