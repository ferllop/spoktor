import {visualRegressionPlugin} from '@web/test-runner-visual-regression/plugin'
import * as path from 'node:path'

export function uploadFilePlugin() {
    function computeAbsoluteFilePaths(testFile, filePaths) {
        const computeAbsoluteFilePath = filePath => path.join(path.dirname(testFile), filePath)

        if (Array.isArray(filePaths)) {
            filePaths.map(computeAbsoluteFilePath)
        }

        if (typeof filePaths === 'string') {
            return [computeAbsoluteFilePath(filePaths)]
        }

        throw new Error('filePath must be a string to upload one file or an array of strings to upload multiple files')
    }

    async function getElement(page, selector) {
        return await (await page.evaluateHandle(selector)).asElement();
    }

    async function putFiles(page, input, absoluteFilePaths) {
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            input.click(),
        ])
        await fileChooser.accept(absoluteFilePaths)
    }

    return {
        name: 'upload-file-command',

        async executeCommand({command, payload, session}) {
            if (command === 'upload-file') {
                if (session.browser.type === 'puppeteer') {
                    const page = session.browser.getPage(session.id)
                    const absoluteFilePaths = computeAbsoluteFilePaths(session.testFile, payload.filePaths)
                    const input = await getElement(page, payload.selector)
                    await putFiles(page, input, absoluteFilePaths)
                    return true
                }

                throw new Error(
                    `Uploading file is not supported for browser type ${session.browser.type}.`,
                )
            }
            return undefined
        },
    }
}

export function shadowRootClickPlugin() {
    async function getElement(page, selector) {
        return await (await page.evaluateHandle(selector)).asElement();
    }

    return {
        name: 'shadow-root-click-command',
        async executeCommand({command, payload, session}) {
            if (command === 'shadow-root-click') {
                if (session.browser.type === 'puppeteer') {
                    const page = session.browser.getPage(session.id)
                    const input = await getElement(page, payload.selector)
                    await input.click()
                    return true
                }

                throw new Error(
                    `Uploading file is not supported for browser type ${session.browser.type}.`,
                )
            }
            return undefined
        },
    }
}

export default {
    plugins: [
        visualRegressionPlugin({
            update: process.argv.includes('--update-snapshots'),
        }),
        uploadFilePlugin(),
        shadowRootClickPlugin(),
    ],
}
