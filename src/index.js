import {parse} from 'node-html-parser'
import * as fs from 'fs'
import {Spotify} from './Spotify.js'

const spotify = new Spotify({parse})

try {
    const spotifyPLaylistFile = process.argv[2]
    const file = fs.readFileSync(spotifyPLaylistFile, 'utf8')
    console.log(spotify.parse(file))
} catch (error) {
    console.log(error.message)
}
