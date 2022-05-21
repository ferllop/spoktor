export class TraktorCollectionGenerator {
    execute(digests) {
        const header = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<NML VERSION="19"><HEAD COMPANY="www.native-instruments.com" PROGRAM="Traktor"></HEAD>
<COLLECTION ENTRIES="${digests.length}">`
        const footer = '</COLLECTION></NML>'
        return header +
            digests.map(digest => digest.digest.rawData).join('') +
            footer
    }
}