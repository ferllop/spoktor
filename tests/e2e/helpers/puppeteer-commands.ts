import path from 'node:path'
import { Page } from 'puppeteer'

function computeAbsoluteFilePath(testFilePath: string, filePath: string) {
    return path.join(path.dirname(testFilePath), filePath)
}

function computeAbsoluteFilePaths(testFilePath: string, filePaths: string | string[]) {
    if (Array.isArray(filePaths)) {
        return filePaths.map(filepath => computeAbsoluteFilePath(testFilePath, filepath))
    }

    if (typeof filePaths === 'string') {
        return [computeAbsoluteFilePath(testFilePath, filePaths)]
    }

    throw new Error('filePath must be a string to upload one file or an array of strings to upload multiple files')
}

async function putFiles(page: Page, selector: string, absoluteFilePaths: string[]) {
    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click(selector),
    ])
    await fileChooser.accept(absoluteFilePaths)
}

function getPathFromImportMeta(importMeta: ImportMeta) {
    return new URL('', importMeta.url).pathname
}

export async function uploadFile(puppeteerPage: Page, importMeta: ImportMeta, filePaths: string | string[], selector: string) {
    const testFilePath = getPathFromImportMeta(importMeta)
    const absoluteFilePaths = computeAbsoluteFilePaths(testFilePath, filePaths)
    await putFiles(puppeteerPage, selector, absoluteFilePaths)
}
