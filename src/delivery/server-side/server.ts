import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'

const app = express()
const port = process.env['PORT'] || 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(_, res) {
    res.sendFile('index.html')
})
app.listen(port)
console.log('Server started at http://localhost:' + port)
