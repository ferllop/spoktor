import path from 'node:path'
import {curry} from 'ramda'

function computeAbsoluteFilePath(testFilePath, /* string */ filePath) {
    return path.join(path.dirname(testFilePath), filePath)
}

function computeAbsoluteFilePaths(testFilePath, filePaths) {
    if (Array.isArray(filePaths)) {
        return filePaths.map(curry(computeAbsoluteFilePath)(testFilePath))
    }

    if (typeof filePaths === 'string') {
        return [computeAbsoluteFilePath(testFilePath, filePaths)]
    }

    throw new Error('filePath must be a string to upload one file or an array of strings to upload multiple files')
}

async function putFiles(page, selector, absoluteFilePaths) {
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(selector),
    ])
    await fileChooser.accept(absoluteFilePaths)
}

function getPathFromImportMeta(importMeta) {
    return new URL('', importMeta.url).pathname
}

export async function uploadFile(puppeteerPage, importMeta, filePaths, selector) {
    const testFilePath = getPathFromImportMeta(importMeta)
    const absoluteFilePaths = computeAbsoluteFilePaths(testFilePath, filePaths)
    await putFiles(puppeteerPage, selector, absoluteFilePaths)
}
