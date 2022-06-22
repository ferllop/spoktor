import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import {createLink} from '../../domain/models/youtube-playlist-link-creator'

const app = express()
const port = process.env['PORT'] || 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', function(_, res) {
    res.sendFile('index.html')
})

app.post('/youtube-links', (req, res) => {
    const links = createLink(req.body['youtube-video-list'])
    const anchor = `<a href="${links}" target="_blank" rel="noopener">Go to playlist</a>`
    res.send(anchor)
})

app.listen(port)
console.log('Server started at http://localhost:' + port)
