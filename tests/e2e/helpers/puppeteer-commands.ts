import path from 'node:path'
import { Page } from 'puppeteer'

export const uploadFiles
= (page: Page, importMeta: ImportMeta, filePaths: string[], selector: string): Promise<void> => {
    const testFilePath = getFilePath(importMeta)
    const absoluteFilePaths = filePaths.map(computeAbsoluteFilePath(testFilePath))
    return putFiles(page, selector, absoluteFilePaths)
}

const getFilePath = (importMeta: ImportMeta): string => 
    new URL('', importMeta.url).pathname

const computeAbsoluteFilePath = (testFilePath: string) => (filePath: string): string => 
    path.join(path.dirname(testFilePath), filePath)

const putFiles = (page: Page, selector: string, absoluteFilePaths: string[]): Promise<void> =>
    Promise.all([
        page.waitForFileChooser(),
        page.click(selector),
    ])
    .then(([fileChooser]) => fileChooser.accept(absoluteFilePaths))

