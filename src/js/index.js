import {selectParserFor} from './domain/parsers/parser-selector'

let needles
let haystack

const needlesInput = document.getElementById('needles')
const haystackInput = document.getElementById('haystack')

window.addEventListener('load', handleInitialLoad)
needlesInput.addEventListener('change', handleNeedleChange())
haystackInput.addEventListener('change', handleHaystackChange())

function handleNeedleChange() {
    return async event => {
        const fileContent = await loadFileContent(event.target)
        const parser = await selectParserFor(fileContent)
        needles = parser.parse(fileContent)
        if (needles !== undefined && haystack !== undefined) {
            const result = await fetch('/intersect', {method: 'POST', body: JSON.stringify({needles, haystack})})
            console.log(result)
        }
    }
}

function handleHaystackChange() {
    return async event => {
        const fileContent = await loadFileContent(event.target)
        const parser = await selectParserFor(fileContent)
        haystack = parser.parse(fileContent)
        if (needles !== undefined && haystack !== undefined) {
            const bodyContent = await compressGzip(JSON.stringify({needles, haystack}))
            const result = await fetch('/intersect', {method: 'POST', body: bodyContent})
            console.log(result)
        }
    }
}

function handleInitialLoad() {
    if (needlesInput.value) {
        loadFileContent(needlesInput, needlesInput, 'needles-load')
    }
    if (haystackInput.value) {
        loadFileContent(haystackInput, needlesInput, 'haystack-load')
    }
}

function handleInputChange(eventName, dispatcher, loaderFunction) {
    return (event) => loaderFunction(event.target, dispatcher, eventName)
}

function loadFileContent(inputElement) {
    return new Promise((resolve, reject) => {

        if (!inputElement.files?.[0]) {
            return reject()
        }
        const fr = new FileReader()
        fr.addEventListener('load', () => {
            return resolve(fr.result)
        })
        fr.readAsText(inputElement.files[0])
    })
}
